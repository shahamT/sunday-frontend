// === Libs

// === Services
import { getShortRelativeTime } from "../../../../../services/base/util.service";

// === Actions

// === Hooks / React
import { useEffect, useState } from "react";
import { Tooltip } from "../../../../reusables/tooltip/Tooltip";

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function ActivityLogRow({ activity, task, board }) {
  // === Consts
  const [activityType, setActivityType] = useState(false);
  const [group, setGroup] = useState({});
  const [cvType, setCvType] = useState({});
  const [colName, setColName] = useState("");
  const [prevVal, setPrevVal] = useState(null);
  const [newVal, setNewVal] = useState(null);
console.log(activity)
  // === Effects
  useEffect(() => {
    handleActivityType(activity.type);
  }, []);

  // === Functions
  function handleActivityType(type) {
    switch (type) {
      case "add task":
        setActivityType("add task");
        const currGroup = board.groups.find((group) => {
          return group.tasks.find((t) => t.id === task.id);
        });
        setGroup(currGroup);
        return;

      case "remove task":
        console.log('remove')
        setActivityType("remove task");
        const prevGroup = board.groups.find((group) => {
          return group.tasks.find((t) => t.id === task.id);
        });
        setGroup(prevGroup);
        return;

      case "move task":
        console.log('hi')
        if (activity.fromGroupId !== activity.toGroupId) {
          setActivityType("move task");
          const fromGroup = board.groups.find( g => g.id === activity.fromGroupId)
          const toGroup = board.groups.find(g => g.id === activity.toGroupId)

          setGroup({ fromGroup, toGroup })
        }
        return

      case "set column value":
        const currCol = board.columns.find((col) => col.id === activity.colId);
        setColName(currCol?.name || "");
        setActivityType("set column value");
        if (currCol.type.variant === "file") {
          setCvType("file");
        } else if (currCol.type.variant === "date") {
          if (activity.value) setNewVal(formatSmartDate(activity.value));
          if (activity.prevValue) setPrevVal(formatSmartDate(activity.prevValue));
          setCvType("date");
        } else if (currCol.type.variant === "status") {
          const currValue = activity.value
            ? currCol.type.labels.find((label) => label.id === activity.value)
            : null;
          const prevValue = activity.prevValue
            ? currCol.type.labels.find(
              (label) => label.id === activity.prevValue
            )
            : null;
          setNewVal(currValue);
          setPrevVal(prevValue);
          setCvType("status");
        } else if (currCol.type.variant === "people") {
          const currValue = activity.value?.filter((user) => {
            return !activity.prevValue?.some(
              (prevUser) => prevUser._id === user._id
            );
          });
          const prevValue = activity.prevValue?.filter((prevUser) => {
            return !activity.value?.some((user) => user._id === prevUser._id);
          });

          if (currValue) setNewVal(currValue[0]);
          if (prevValue) setPrevVal(prevValue[0]);
          setCvType("people");
        } else setCvType("regular");
        return;
    }
  }

  function formatSmartDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();

    const isThisYear = date.getFullYear() === now.getFullYear();

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      ...(isThisYear ? {} : { year: "numeric" }),
    }).format(date);
  }

  // if (!data) return <div>Loading...</div>
  return (

    // basic details section
    <section className="ActivityLogRow">
      {activityType !== "move task" && (
        <section className="activity-row-section basic-details">
          <p className="time">{getShortRelativeTime(activity.createdAt)}</p>
          <div className="profile-img-wrapper">
            <img src={activity.createdBy} alt="" />
          </div>
          <p className="task-name">{task.columnValues[0]?.value}</p>
        </section>
      )}

      {activityType === "move task" && (
        <section className="move-task-wraper">
          <section className="move-task">

            <section className="activity-row-section basic-details">
              <p className="time">{getShortRelativeTime(activity.createdAt)}</p>
              <div className="profile-img-wrapper">
                <img src={activity.createdBy} alt="" />
              </div>
              <p className="task-name">{task.columnValues[0]?.value}</p>
            </section>

            <section className="activity-row-section action-title">
              <p className="action-name moved">Moved</p>
            </section>

            <section className="activity-row-section change-details">
              <p className="regular-action">
                To group:{" "}
                <span className={`${group.toGroup.color}-text`}>
                  {group.toGroup.name}
                </span>
              </p>
            </section>

          </section>

          <section className="move-task">

            <section className="activity-row-section basic-details">
              <p className="time">{getShortRelativeTime(activity.createdAt)}</p>
              <div className="profile-img-wrapper">
                <img src={activity.createdBy} alt="" />
              </div>
              <p className="task-name">{task.columnValues[0]?.value}</p>
            </section>

            <section className="activity-row-section action-title">
              <p className="action-name moved">Moved</p>
            </section>

            <section className="activity-row-section change-details">

              <p className="regular-action">
                From group:{" "}
                <span className={`${group.fromGroup.color}-text`}>
                  {group.fromGroup.name}
                </span>
              </p>
            </section>

          </section>

        </section>
      )}


      {/* action type section */}
      {activityType === "add task" && (
        <>
          <section className="activity-row-section action-title">
            <p className="action-name created">Created</p>
          </section>
          <section className="activity-row-section add-task">
            <p className="regular-action">
              Group: <span className={`${group.color}-text`}>{group.name}</span>
            </p>
          </section>
        </>

      )}
      {activityType === "remove task" && (
        <section className="activity-row-section action-title">
          <p className="action-name deleted">Deleted</p>
        </section>
      )}
      {activityType === "set column value" && (
        <>
          <section className="activity-row-section action-title">
            <p className={`action-name ${colName}`}>
              {colName === "Task" ? "Name" : colName}
            </p>
          </section>


          {/* change details section */}
          <section className="activity-row-section change-details">

            {cvType === "file" && (
              <>
                {activity.prevValue ? (
                  <div className="profile-img-wrapper">
                    <img className="prev-value" src={activity.prevValue} alt="" />
                  </div>
                ) : (
                  <div className="prev-value">-</div>
                )}

                <div className="change-arrow"></div>

                {activity.value ? (
                  <div className="profile-img-wrapper">
                    <img className="to-value" src={activity.value} alt="" />
                  </div>
                ) : (
                  <div className="to-value">-</div>
                )}
              </>
            )}


            {cvType === "regular" && (
              <>
                <div className="prev-value">{activity.prevValue || "-"}</div>

                <div className="change-arrow"></div>

                <div className="to-value">{activity.value || "-"}</div>
              </>
            )}


            {cvType === "date" && (
              <>
                <div className="prev-value">{prevVal || "-"}</div>

                <div className="change-arrow"></div>

                <div className="to-value">{newVal || "-"}</div>
              </>
            )}


            {cvType === "status" && (
              <>
                <div
                  className={`prev-value ${prevVal?.color
                    ? `${prevVal.color}-bg-static`
                    : "unselected-gray"
                    }`}
                  style={{ color: "white" }}
                >
                  {prevVal?.name || ""}
                </div>

                <div className="change-arrow"></div>

                <div
                  className={`to-value ${newVal?.color
                    ? `${newVal.color}-bg-static`
                    : "unselected-gray"
                    }`}
                  style={{ color: "white" }}
                >
                  {newVal?.name || ""}
                </div>
              </>
            )}


            {cvType === "people" && (
              <section className="people-change-details regular-action">
                <div>{newVal ? "Added" : "Removed"} </div>
                <Tooltip title={newVal?.name || prevVal?.name}>
                  <div className="profile-img-wrapper">
                    <img src={newVal?.profileImg || prevVal.profileImg} alt="" />
                  </div>
                </Tooltip>
              </section>
            )}

          </section>
        </>
      )
      }
    </section >
  );
}

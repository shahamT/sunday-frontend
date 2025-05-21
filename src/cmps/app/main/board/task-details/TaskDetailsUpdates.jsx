// === Libs

import { TaskDetailsTextEditor } from "./TaskDetailsTextEditor";

// === Services

// === Actions
import { addTaskUpdate } from "../../../../../store/actions/board.actions";
import { Updates } from "./Updates";
import { update } from "lodash";
import { useEffect, useState } from "react";

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function TaskDetailsUpdates({ boardId, groupId, taskId, task}) {
  // === Consts
  const [update, setUpdate] = useState('')

  // === Effects
  useEffect(() => {

  }, [update])

  // === Functions
  function saveUpdate(txt) {
    addTaskUpdate(boardId, groupId, taskId, txt).then(update => {
        setUpdate(update)
    })
  }

  // if (!data) return <div>Loading...</div>
  return (
    <section className="TaskDetailsUpdates">
      <TaskDetailsTextEditor saveUpdate={saveUpdate} /> 
      {!task.updates.length ?
      <div className="no-updates">
        <div className="profile-img-wrapper">
          <img src="https://microfrontends.monday.com/mf-feed/latest/static/media/empty-state.8bf98d52.svg" alt="No updates yet"></img>
        </div>
        <h3>No updates yet</h3>
        <p>Share progress here!</p>
      </div>
      : <Updates task={task} />                    
      }

    </section>
  );
}

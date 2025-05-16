// === Libs
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

// === Services

// === Actions
import { addGroup, moveTask } from "../../../../../store/actions/board.actions";

// === Hooks / React
import { useSelector } from "react-redux";


// === Imgs

// === Child Components
import { T_Filter } from "./T_Filter";
import { T_Group } from "./T_Group";
import { useRef, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { store } from '../../../../../store/store';

// ====== Component ======
// =======================

export function T_GroupsList({ /* prop1, prop2 */ }) {
    // === Consts
    const board = useSelector(storeState => storeState.boardModule.board)
    console.log("board: ", board)

    const liveColumnWidthsRef = useRef({});
    const [resizeVersion, setResizeVersion] = useState(0);

    function bumpResizeVersion() {
        setResizeVersion(v => v + 1);
    }

    // === Functions
    function onAddGroup() {
        addGroup()
    }

    function handleDragEnd(event) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const [activeTaskId, fromGroupId] = active.id.split('|');
        const [overTaskId, toGroupId] = over.id.split('|');

        const board = store.getState().boardModule.board;
        const fromGroup = board.groups.find(group => group.id === fromGroupId);
        const toGroup = board.groups.find(group => group.id === toGroupId);

        if (!fromGroup || !toGroup) return;

        const task = fromGroup.tasks.find(t => t.id === activeTaskId);
        if (!task) return;

        // Remove from source group
        const updatedFromTasks = fromGroup.tasks.filter(t => t.id !== activeTaskId);

        // Find index to insert into destination group
        const overIndex = toGroup.tasks.findIndex(t => t.id === overTaskId);
        const insertIndex = overIndex === -1 ? toGroup.tasks.length : overIndex;

        // Optimistically move task
        moveTask({
            task,
            fromGroupId,
            toGroupId,
            toIndex: insertIndex
        });
    }


    if (!board) return <div>Loading...</div>
    return (
        <section className="T_GroupsList">

            {board?.groups?.length &&
                <DndContext onDragEnd={handleDragEnd}>
                    <SortableContext
                        items={
                            board.groups.flatMap(group =>
                                group.tasks.map(task => `${task.id}|${group.id}`)
                            )
                        }
                        strategy={verticalListSortingStrategy}
                    >
                        {board.groups.map(group => (
                            <T_Group
                                key={group.id}
                                group={group}
                                columns={board.columns}
                                liveColumnWidthsRef={liveColumnWidthsRef}
                                resizeVersion={resizeVersion}
                                bumpResizeVersion={bumpResizeVersion}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            }

            <div
                className="add-group-btn clickable clear outlined size-32 icon-start i-Add"
                onClick={onAddGroup}
            >Add group item</div>

        </section>
    )
}
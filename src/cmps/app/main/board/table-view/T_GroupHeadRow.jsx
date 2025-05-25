// === Libs



// === Services

// === Actions

// === Hooks / React

// === D & D
import { SortableContext } from '@dnd-kit/sortable'

// === Child Components
import { useEffect, useRef, useState } from "react";
import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu"
import { ColTypePicker } from "../value-setter/ColTypePicker"
import { T_ColumnHeaderCell } from "./T_ColumnHeaderCell"
import { ColumnsDndContext } from './ColumnsDndContext'
import { useSelector } from 'react-redux';


// ====== Component ======
// =======================

export function T_GroupHeadRow({ group, liveColumnWidthsRef, resizeVersion, bumpResizeVersion }) {
    const board = useSelector(storeState => storeState.boardModule.board)
    
    // === Consts
    const [overId, setOverId] = useState(null)
    const headerRef = useRef()
    const sentinelRef = useRef()
    

    // === Effects
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                headerRef.current?.classList.toggle("sticked", !entry.isIntersecting);
            },
            {
                threshold: 0,
                rootMargin: `-${243}px 0px 0px 0px`,
            }
        );
        
        if (sentinelRef.current) observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, []);
    
    // === Functions
    
    return (
        <>
            <div className="gorup-head-row-sentinal" ref={sentinelRef} />
            <section
                className="T_GroupHeadRow"
                ref={headerRef}
                >
                <div className={`t-left-indicator top ${group.color}-bg-static`}>
                    {/* <div className="top-line-hider"></div> */}
                </div>
                <ColumnsDndContext setOverId={setOverId} columns={board?.columns} group={group} board={board}>
                    <SortableContext
                        items={board?.columns.map(col => col.id)}
                        strategy={()=>null}
                    >
                        {board.columns.map((column, idx) => {
                            return <T_ColumnHeaderCell
                                key={column.id + idx}
                                column={column}
                                groupId={group.id}
                                liveColumnWidthsRef={liveColumnWidthsRef}
                                resizeVersion={resizeVersion}
                                bumpResizeVersion={bumpResizeVersion}
                                isOver={column.id === overId}
                                

                            />
                        })}
                    </SortableContext>
                </ColumnsDndContext>
                <div className="add-column-btn-container">
                    <PopUpMenu
                        position="bottom-end"
                        renderContent={({ onCloseModal }) => (
                            <ColTypePicker onCloseModal={onCloseModal} />
                        )}>
                        <div className="add-column-btn clickable clear icon-btn size-24 i-Add" />
                    </PopUpMenu>


                </div>

            </section>
        </>
    )
}
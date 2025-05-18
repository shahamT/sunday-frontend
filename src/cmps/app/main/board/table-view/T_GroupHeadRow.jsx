// === Libs



// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components
import { useEffect, useRef } from "react";
import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu"
import { ColTypePicker } from "../value-setter/ColTypePicker"
import { T_ColumnHeaderCell } from "./T_ColumnHeaderCell"

// ====== Component ======
// =======================

export function T_GroupHeadRow({ columns, group, liveColumnWidthsRef, resizeVersion, bumpResizeVersion }) {
    // === Consts
    const headerRef = useRef();
    const sentinelRef = useRef();


    // === Effects
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                headerRef.current?.classList.toggle("sticked", !entry.isIntersecting);
            },
            {
                threshold: 0,
                rootMargin: `-${244}px 0px 0px 0px`,
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

                {columns.map((column, idx) => {
                    return <T_ColumnHeaderCell
                        key={column.id + idx}
                        column={column}
                        groupId={group.id}
                        liveColumnWidthsRef={liveColumnWidthsRef}
                        resizeVersion={resizeVersion}
                        bumpResizeVersion={bumpResizeVersion}

                    />
                })}

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
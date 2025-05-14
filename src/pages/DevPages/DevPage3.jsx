// === Style

import { BoardMenu } from "../../cmps/app/main/board/popupMenu/BoardMenu";
import {  TaskMenu } from "../../cmps/app/main/board/popupMenu/TaskMenu";
import { ColumnMenu } from "../../cmps/app/main/board/popupMenu/ColumnMenu";
import { GroupMenu } from "../../cmps/app/main/board/popupMenu/GroupMenu";
import { PopUpMenu } from "../../cmps/reusables/PopUpMenu/PopUpMenu";

// === Libs

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function DevPage3({ /* prop1, prop2 */ }) {
    // === Consts

    // === Effects

    // === Functions
    // .DevPage3 {
    //     display: flex;
    //     justify-content: center;  
    //     align-items: center;       
    //     min-height: 100vh;         
    //     text-align: center;      
      
    
    //     // padding: 2em;
    //     // box-sizing: border-box;
    //   }
    // if (!data) return <div>Loading...</div>
    return (
        <section className="DevPage3">
            <h1>DevPage3</h1>

            <div className="menu-btn-wraper">
                      <PopUpMenu
                        position="start-end"
                        renderContent={({ onCloseModal }) => (
                          <TaskMenu
                            onCloseModal={onCloseModal}
                            // taskId={task.id}
                           
                          />
                        )}
                      >
                        <div className="menu-btn clickable clear size-24 icon-btn i-Menu" />
                      </PopUpMenu>
                    </div>

                    
            <div className="menu-btn-wraper">
                      <PopUpMenu
                        position="start-end"
                        renderContent={({ onCloseModal }) => (
                          <ColumnMenu
                            onCloseModal={onCloseModal}
                            // columnId={column.id}
                           
                          />
                        )}
                      >
                        <div className="menu-btn clickable clear size-24 icon-btn i-Menu" />
                      </PopUpMenu>
                    </div>


            <div className="menu-btn-wraper">
                      <PopUpMenu
                        position="start-end"
                        renderContent={({ onCloseModal }) => (
                          <GroupMenu
                            onCloseModal={onCloseModal}
                            // groupId={group.id}
                           
                          />
                        )}
                      >
                        <div className="menu-btn clickable clear size-24 icon-btn i-Menu" />
                      </PopUpMenu>
                    </div>
        </section>
    )
}
// === Style

// import { BoardMenu } from "../../cmps/app/main/board/popupMenu/BoardMenu";
// import {  TaskMenu } from "../../cmps/app/main/board/popupMenu/TaskMenu";
// import { ColumnMenu } from "../../cmps/app/main/board/popupMenu/ColumnMenu";
// import { GroupMenu } from "../../cmps/app/main/board/popupMenu/GroupMenu";
// import { PopUpMenu } from "../../cmps/reusables/PopUpMenu/PopUpMenu";
import { PersonsPreview } from "../../cmps/app/main/board/table-view/T_CellContent/PersonsPreview"

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

    const selectedPersons =[
      {
        _id: "cKdrA",
        account: "acc001",
        firstName: "John",
        lastName: "Doe",
        email: "user1@company.com",
        profileImg: "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff&length=2&rounded=true&bold=true",
      },
      {
        _id: "ehy6w",
        account: "acc001",
        firstName: "User2",
        lastName: "Lastname2",
        email: "user2@company.com",
        profileImg: "https://ui-avatars.com/api/?name=User2+Lastname2&background=FF5733&color=fff&length=2&rounded=true&bold=true",
      },
      {
        _id: "yotQF",
        account: "acc001",
        firstName: "Noga",
        lastName: "Shaham",
        email: "user3@company.com",
        profileImg: "https://ui-avatars.com/api/?name=Noga+Shaham&background=28A745&color=fff&length=2&rounded=true&bold=true",
      }
    ]

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

            <PersonsPreview selectedPersons={selectedPersons} amount={2}/>

            {/* <div className="menu-btn-wraper">
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
                    </div> */}
        </section>
    )
}
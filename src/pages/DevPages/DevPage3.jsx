// === Style

import { BoardMenu } from "../../cmps/app/main/board/popupMenu/BoardMenu";
import { TaskMenu } from "../../cmps/app/main/board/popupMenu/TaskMenu";
import { ColumnMenu } from "../../cmps/app/main/board/popupMenu/ColumnMenu";
import { GroupMenu } from "../../cmps/app/main/board/popupMenu/GroupMenu";
import { PopUpMenu } from "../../cmps/reusables/PopUpMenu/PopUpMenu";
import { ImgUploader } from "../../cmps/app/main/board/value-setter/ImgUploader";

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
    //   }
    // if (!data) return <div>Loading...</div>


    return (
        <section className="DevPage3">
            <h1>DevPage3</h1>
            <ImgUploader />
            <div className="circle i-HighlightColorBucket color-picker-item icon-start" />
        </section>



    )
}
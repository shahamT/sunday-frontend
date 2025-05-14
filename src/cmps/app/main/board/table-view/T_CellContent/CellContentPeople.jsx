// === Libs

// === Services

// === Actions
import { removeColumnValue, setColumnValue } from "../../../../../../store/actions/board.actions";

// === Hooks / React
import { useRef } from "react";

// === Imgs

// === Child Components
import { PopUpMenu } from "../../../../../reusables/PopUpMenu/PopUpMenu";
import { PersonsPicker } from "../../value-setter/PersonsPicker";
import { PersonsPreview } from "./PersonsPreview";

// ====== Component ======
// =======================

export function CellContentPeople({ taskId, column, columnValue }) {
    // === Consts
    // === Effects

    // === Functions

    function setPersons(PersonsArray) {
        try {
            setColumnValue(taskId, column.id, PersonsArray)
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }
    }

    function onClearPersons() {
        try {
            removeColumnValue(taskId, column.id)
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }
    }

    return (
        <div className={`CellContentPeople cell-contnet`}>
            <PopUpMenu
                stretchTrigger={true}
                gap={4}
                noArrow={false}
                position="bottom"
                renderContent={({ onCloseModal }) => (
                    <PersonsPicker onCloseModal={onCloseModal} currSelectedPersons={columnValue.value || []} setPersons={setPersons} />
                )}
            >

                {columnValue?.value
                    ?
                    <PersonsPreview selectedPersons={columnValue?.value} amount={2}/>

                    // <div>{columnValue?.value.map(person => {
                    //     return <p key={person._id}>{person.firstName}</p>
                    // })}
                    // </div>

                    :
                    <div>empty</div>
                }


                {/* <div className={`cell-contnet centered ${labelColor}-bg-static ${columnValue ? '' : 'default-color'}`}>
                    <div className="fold" />
                    {columnValue && <p>{labelName}</p>}
                </div> */}
            </PopUpMenu>

        </div>



    )
}


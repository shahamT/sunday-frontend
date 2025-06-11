// === Libs

// === Services
import { showErrorMsg } from "../../../../../services/base/event-bus.service"

// === Actions
import { removeColumnValue, setColumnValue } from "../../../../../store/actions/board.actions"

// === Hooks / React
import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"

// === Imgs

// === Child Components
import { PersonsPreview } from "../table-view/T_CellContent/PersonsPreview"
import { PersonsPicker } from "../value-setter/PersonsPicker"
import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu"

// ====== Component ======
// =======================

export function K_ContentPeople({ column, value, taskId }) {

    // === Consts
    const users = useSelector(storeState => storeState.userModule.users)
    const [personsArray, setPersonsArray] = useState([])
    const hasMounted = useRef(false)
    const [animationKey, setAnimationKey] = useState(0)

    
    // === Effects
    useEffect(() => {
        if(!users) return
        const persons = users.filter(user => {
            return value.some(v => v._id === user._id)
        })
        setPersonsArray(persons)
    },[users, value])

    // === Functions
    function setPersons(persons) {
    
        try {
            if (!persons.length) onClearPersons();
            else setColumnValue(taskId, column, persons, value);

            // Prevent animation on first mount
            if (!hasMounted.current) {
                hasMounted.current = true;
                return;
            }

            // Trigger animation after first interaction
            setAnimationKey(prev => prev + 1);
    
            } catch (err) {
                showErrorMsg(`Something went wrong`);
            }
        }
    
        function onClearPersons() {
            try {
                removeColumnValue(taskId, column.id, value);
            } catch (err) {
                showErrorMsg(`Something went wrong`);
            }
        }

    return (
        <section className="K_ContentPeople">

            <PopUpMenu
                stretchTrigger={true}
                gap={4}
                noArrow={false}
                position="bottom"
                renderContent={({ onCloseModal }) => (
                    <PersonsPicker
                        onCloseModal={onCloseModal}
                        currSelectedPersons={personsArray || []}
                        setPersons={setPersons}
                    />
                )}
            >
                <div className={`people persons-preview-wraper ${hasMounted.current ? 'animate__animated animate__bounceIn' : ''}`}
                 style={{ paddingInlineStart: personsArray.length === 1 ? '0' : '7px'}}>
                    <PersonsPreview selectedPersons={personsArray} amount={1} />
                </div>

            </PopUpMenu>
        </section>
    )
}
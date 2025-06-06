import { useRef, useState } from "react";
import { removeColumnValue, setColumnValue } from "../../../../../../store/actions/board.actions";
import { PopUpMenu } from "../../../../../reusables/PopUpMenu/PopUpMenu";
import { PersonsPicker } from "../../value-setter/PersonsPicker";
import { PersonsPreview } from "./PersonsPreview";

export function CellContentPeople({ task, column, columnValue }) {
    const taskId = task.id
    const [animationKey, setAnimationKey] = useState(0);
    const hasMounted = useRef(false); // 👈 Track if initial render has passed
    function setPersons(PersonsArray) {

        try {
            if (PersonsArray.length === 0) onClearPersons();
            else setColumnValue(taskId, column.id, PersonsArray, columnValue?.value);

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
            removeColumnValue(taskId, column.id, columnValue?.value);
        } catch (err) {
            showErrorMsg(`Something went wrong`);
        }
    }

    return (
        <div className="CellContentPeople cell-content">
            <div className="plus-btn">
                <div className="plus-icon i-AddSmall" />
            </div>

            <PopUpMenu
                stretchTrigger={true}
                gap={4}
                noArrow={false}
                position="bottom"
                renderContent={({ onCloseModal }) => (
                    <PersonsPicker
                        onCloseModal={onCloseModal}
                        currSelectedPersons={columnValue?.value || []}
                        setPersons={setPersons}
                    />
                )}
            >
                {columnValue?.value && columnValue?.value.length !== 0 ? (
                    <div
                        key={animationKey}
                        className={`persons-preview-wraper ${hasMounted.current ? 'animate__animated animate__bounceIn' : ''}`}
                    >
                        <PersonsPreview selectedPersons={columnValue?.value} amount={2} />
                    </div>
                ) : (
                    <img
                        key={animationKey}
                        className={`empty-state-person ${hasMounted.current ? 'animate__animated animate__bounceIn' : ''}`}
                        src="https://res.cloudinary.com/dqaq55tup/image/upload/v1747325483/sunday-person-column_m0mipa.svg"
                        alt=""
                    />
                )}
            </PopUpMenu>
        </div>
    );
}

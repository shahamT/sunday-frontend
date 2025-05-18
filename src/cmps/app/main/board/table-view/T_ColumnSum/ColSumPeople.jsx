// === Libs

import { reduce } from "lodash"
import { PersonsPreview } from "../T_CellContent/PersonsPreview"
import { PersonsPicker } from "../../value-setter/PersonsPicker"
import { PopUpMenu } from "../../../../../reusables/PopUpMenu/PopUpMenu"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function ColSumPeople({column, group ,columnValues}) {

    // === Consts

    const relevantValues = columnValues.flat().reduce((acc, people) => {
        if (!acc.find(p => p.id === people._id)) acc.push(people)
        return acc
      }, [])


    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="col-sum-people">
             <PopUpMenu
                            stretchTrigger={true}
                            gap={4}
                            noArrow={false}
                            position="bottom"
                            renderContent={({ onCloseModal }) => (
                                <PersonsPicker
                                    onCloseModal={onCloseModal}
                                    currSelectedPersons={relevantValues?.value || []}
                                />
                            )}
                        >
           <PersonsPreview selectedPersons={relevantValues} amount={2} />
           </PopUpMenu>
        </section>
    )
}
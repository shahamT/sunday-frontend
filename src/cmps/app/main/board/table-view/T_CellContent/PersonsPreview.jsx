// === Libs

import { Tooltip } from "../../../../../reusables/tooltip/Tooltip"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function PersonsPreview({ selectedPersons = [], amount = 0 }) {

    // === Consts

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="PersonsPreview" >
            {selectedPersons.slice(0, amount).map(person => {
                return (
                    <Tooltip key={person._id} title={`${person.firstName} ${person.lastName}`}><div className="profile-img-wrapper" style={{ marginInlineStart: selectedPersons.length === 1 ? '0' : '-7px'}}>
                        <img src={person.profileImg || `https://cdn1.monday.com/dapulse_default_photo.png`} alt="" />
                    </div></Tooltip>
                )
            })}

            {(selectedPersons.length - amount > 0) 
            && <div className="and-others">{`+ ${selectedPersons.length - amount}`}</div>
        }
        </section>
    )
}

 
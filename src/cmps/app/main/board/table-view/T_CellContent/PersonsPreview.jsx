// === Libs

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function PersonsPreview({ selectedPersons = [], amount }) {
    // === Consts

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="PersonsPreview" >
            {selectedPersons.slice(0, amount).map(person => {
                return (
                    <img style={{ marginInlineStart: selectedPersons.length === 1 ? '0' : '-7px'}} key={person._id} src={person.profileImg} alt="https://cdn1.monday.com/dapulse_default_photo.png" />
                )
            })}

            {(selectedPersons.length - amount > 0) 
            && <div className="and-others">{`+ ${selectedPersons.length - amount}`}</div>
        }
        </section>
    )
}
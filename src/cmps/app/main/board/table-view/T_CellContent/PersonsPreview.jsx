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
        <section className="PersonsPreview">
            {selectedPersons.slice(0, amount).map(person => {
                return (
                    <img key={person._id} src={person.profileImg} alt="" />
                )
            })}

            {(selectedPersons.length - amount > 0) 
            && <div className="and-others">{`+ ${selectedPersons.length - amount}`}</div>
        }
        </section>
    )
}
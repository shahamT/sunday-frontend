// === Libs

import { showSuccessMsg } from "../../../../../services/base/event-bus.service"
import { addGroup, removeGroup } from "../../../../../store/actions/board.actions"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function GroupMenu({ onCloseModal, group }) {
    // === Consts

    // === Effects

    // === Functions
    async function onRemoveGroup() {
        try {
            await removeGroup(group.id)
            showSuccessMsg(`${group.name} group was successfully deleted.`)
        }
        catch (err) {
            showErrorMsg('Something went wrong')
        }

    }
    // if (!data) return <div>Loading...</div>
    return (
        <section className="group-menu">


            <div className="clickable clear size-32 icon-start i-AddSmall full-width full-width left-aligned" onClick={() => addGroup()}>
                Add group
            </div>
            <div className="divider" />
            <div className="clickable clear size-32 i-Edit icon-start full-width left-aligned" onClick={() => {
                onCloseModal()
            }}>Rename</div>
            <div className="delet-btn clickable clear size-32 icon-start full-width i-Delete full-width left-aligned" onClick={onRemoveGroup}>
                Delete
            </div>
        </section>
    )
}
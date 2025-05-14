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

export function GroupMenu({ onCloseModal, groupId }) {
    // === Consts

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="group-popup-menu">

            <div className="add-group-container">
                <div className="clickable clear size-32 icon-start full-width full-width left-aligned" onClick={() => addGroup(groupId)}>
                <div className="icon-btn circle-plus  left-aligned " />
                    Add group
                </div>
            </div>
            <div className="divider" />
            <div className="clickable clear size-32 i-Edit icon-start full-width left-aligned" onClick={() => {
                onCloseModal()
            }}>Rename</div>
            <div className="delet-btn clickable clear size-32 icon-start full-width i-Delete full-width left-aligned" onClick={() => {
                removeGroup(groupId)
                showSuccessMsg('We successfully deleted 1 item')}}>
                Delete
            </div>
        </section>
    )
}
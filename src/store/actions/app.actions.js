import { store } from "../store.js"
import { CLOSE_GLOBAL_MODAL, CLOSE_SIDE_NAV, OPEN_GLOBAL_MODAL, OPEN_SIDE_NAV, SET_GLOBAL_MODAL_CLOSING } from "../reducers/app.reducer.js"


// Global modal

export function openGlobalModal(content) {
  store.dispatch({ type: OPEN_GLOBAL_MODAL, content })
}

export function closeGlobalModal() {
  store.dispatch({ type: SET_GLOBAL_MODAL_CLOSING, isClosing: true })
  setTimeout(() => {
    store.dispatch({ type: CLOSE_GLOBAL_MODAL })
    store.dispatch({ type: SET_GLOBAL_MODAL_CLOSING, isClosing: false })
  }, 150)
}

// Side panel

export function openSidePanel() {
  store.dispatch({ type: OPEN_SIDE_NAV})
}

export function closeSidePanel() {
  store.dispatch({ type: CLOSE_SIDE_NAV})
}
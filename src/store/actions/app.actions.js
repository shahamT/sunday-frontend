import { store } from "../store.js"
import { CLOSE_GLOBAL_MODAL, CLOSE_SIDE_PANEL, OPEN_GLOBAL_MODAL, OPEN_SIDE_PANEL, SET_GLOBAL_MODAL_CLOSING } from "../reducers/app.reducer.js"


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

export function openSIdePanel() {
  store.dispatch({ type: OPEN_SIDE_PANEL})
}

export function closeSIdePanel() {
  store.dispatch({ type: CLOSE_SIDE_PANEL})
}
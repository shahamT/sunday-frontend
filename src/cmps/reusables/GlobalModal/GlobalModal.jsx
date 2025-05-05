import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { closeGlobalModal } from '../../../store/actions/app.actions'
import './GlobalModal.scss'

export function GlobalModal({ noPadding = false }) {

  const isOpen = useSelector(storeState => storeState.appModule.isModalOpen)
  const isClosing = useSelector(storeState => storeState.appModule.isModalClosing)
  const content = useSelector(storeState => storeState.appModule.modalContent)

  useEscapeToClose(isOpen && !isClosing, handleClose)

  function handleClose() {
    closeGlobalModal()
  }


  if (!isOpen || !content) return null

  return (
    <div
      className={`global-modal-backdrop ${isClosing ? 'closing' : ''}`}
      onClick={handleClose}
    >
      <section
        className={`global-modal ${noPadding ? '' : 'padded'} ${isClosing ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </section>
    </div>
  )
}


// use Esc to close

export function useEscapeToClose(isActive, onClose) {
  useEffect(() => {
    if (!isActive) return

    function handleKeyDown(ev) {
      if (ev.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isActive, onClose])
}


// //=============================================
// // ==================SETUP=====================
// //=============================================
// // this modal needs a setup in the redux store:
// //=============================================

// // 1. ==========Redux Store (make sure you point to this reducer from the main reducer)==============

// //Global Modal
// export const OPEN_GLOBAL_MODAL = "OPEN_GLOBAL_MODAL"
// export const CLOSE_GLOBAL_MODAL = "CLOSE_GLOBAL_MODAL"
// export const SET_GLOBAL_MODAL_CLOSING = "SET_GLOBAL_MODAL_CLOSING" // allowing modal trnasition out



// const initialState = {

//   //Global Modal
//   isModalOpen: false,
//   modalContent: null,
//   isModalClosing: false,
// }

// export function appReducer(state = initialState, action = {}) {
//   switch (action.type) {
//     case 'OPEN_GLOBAL_MODAL':
//       return {
//         ...state,
//         isModalOpen: true, modalContent: action.content
//       }
//     case 'SET_GLOBAL_MODAL_CLOSING':
//       return {
//         ...state,
//         isModalClosing: action.isClosing,
//       }
//     case 'CLOSE_GLOBAL_MODAL':
//       return {
//         ...state,
//         isModalOpen: false, modalContent: null
//       }

//     default: return state;
//   }
// }



// // 2. ==========actions file==============
// import { store } from "../store.js"
// import { CLOSE_GLOBAL_MODAL, OPEN_GLOBAL_MODAL, SET_GLOBAL_MODAL_CLOSING } from "../reducers/app.reducer.js"


// export function openGlobalModal(content) {
//   store.dispatch({ type: OPEN_GLOBAL_MODAL, content })
// }

// export function closeGlobalModal() {
//   store.dispatch({ type: SET_GLOBAL_MODAL_CLOSING, isClosing: true })
//   setTimeout(() => {
//     store.dispatch({ type: CLOSE_GLOBAL_MODAL })
//     store.dispatch({ type: SET_GLOBAL_MODAL_CLOSING, isClosing: false })
//   }, 150)
// }

// // 3. ========== Usage ==============

// place the component in the main app jsx component
// use:
// openGlobalModal(<YourContentComponent>)
// inside the content component you can use:
// closeGlobalModal()
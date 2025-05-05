
//Global Modal
export const OPEN_GLOBAL_MODAL = "OPEN_GLOBAL_MODAL"
export const CLOSE_GLOBAL_MODAL = "CLOSE_GLOBAL_MODAL"
export const SET_GLOBAL_MODAL_CLOSING = "SET_GLOBAL_MODAL_CLOSING" // allowing modal trnasition out

//Side Panel
export const OPEN_SIDE_PANEL = "OPEN_SIDE_PANEL"
export const CLOSE_SIDE_PANEL = "CLOSE_SIDE_PANEL"


const initialState = {

    //Global Modal
    isModalOpen: false,
    isModalClosing: false,
    modalContent: null,

    //Side Panel
    isSidePanelOpen: false,

}

export function appReducer(state = initialState, action = {}) {
    switch (action.type) {

        //Global Modal

        case 'OPEN_GLOBAL_MODAL':
            return {
                ...state,
                isModalOpen: true, modalContent: action.content
            }
        case 'SET_GLOBAL_MODAL_CLOSING':
            return {
                ...state,
                isModalClosing: action.isClosing,
            }
        case 'CLOSE_GLOBAL_MODAL':
            return {
                ...state,
                isModalOpen: false, modalContent: null
            }

        //Side Panel
        
        case 'OPEN_SIDE_PANEL':
            return {
                ...state,
                isSidePanelOpen: true
            }
        case 'CLOSE_SIDE_PANEL':
            return {
                ...state,
                isSidePanelOpen: false
            }


        default: return state;
    }
}
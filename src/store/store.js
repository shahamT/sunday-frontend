import { combineReducers, compose, legacy_createStore as createStore } from "redux"
import { userReducer } from "./reducers/user.reducer.js"
import { appReducer } from "./reducers/app.reducer.js"
import { boardReducer } from "./reducers/board.reducer.js"


const rootReducer = combineReducers({
    appModule: appReducer,
    userModule: userReducer,
    boardModule: boardReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store
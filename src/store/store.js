import { carReducer } from "./reducers/car.reducer.js"

import { createStore, compose, combineReducers } from 'redux'

const rootReducer = combineReducers({
    carModule: carReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store

import { createStore } from "redux-dynamic-modules"
import { getObservableExtension, IEpicModule } from "redux-dynamic-modules-observable"
import { default as freeze } from "redux-freeze"

import { composeWithDevTools } from "@reduxjs/redux-devtools-extension-fork"
import { applyMiddleware, combineReducers } from "@reduxjs/toolkit"

import { rootEffects } from "./root"
import { reducers } from "./store.reducer"
import { AppState } from "./store.state"

const store = createStore<AppState> (
    {
        advancedCombineReducers : combineReducers,
        advancedComposeEnhancers : composeWithDevTools ({
            maxAge : 25
        }),
        enhancers : [ applyMiddleware (freeze) ],
        extensions : [ getObservableExtension () ]
    },
    {
        epics : [ rootEffects ],
        id : "root",
        reducerMap : reducers
    } as IEpicModule<AppState>
)

export { store }
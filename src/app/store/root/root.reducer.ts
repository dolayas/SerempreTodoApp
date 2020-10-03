import { AnyAction, createReducer } from "@reduxjs/toolkit"

import { LoadAppName } from "./root.actions"
import { initialState, RootState } from "./root.state"

const rootReducer = createReducer (initialState, builder =>
    builder
        .addCase (LoadAppName, (state, { payload }) => ({ ...state, appName : payload }))
        .addDefaultCase (state => state))

const reducer = (state : RootState | undefined, action : AnyAction) =>
    rootReducer (state, action)

export { reducer }
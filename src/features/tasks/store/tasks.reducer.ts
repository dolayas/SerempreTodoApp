import { AnyAction, createReducer } from "@reduxjs/toolkit"

import { LoadTasksSuccess, SelectTask } from "./tasks.actions"
import { initialState, TasksState } from "./tasks.state"

const tasksReducer = createReducer (initialState, builder =>
    builder
        .addCase (LoadTasksSuccess, (state, { payload }) =>
            ({
                ...state,
                tasks : payload
            }))
        .addCase (SelectTask, (state, { payload }) =>
            ({
                ...state,
                selectedTask : payload
            }))
        .addDefaultCase (state => state))

const reducer = (state : TasksState | undefined, action : AnyAction) =>
    tasksReducer (state, action)

export { reducer }
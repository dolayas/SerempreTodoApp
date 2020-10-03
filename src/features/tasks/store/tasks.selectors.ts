import { createSelector } from "@reduxjs/toolkit"

import { State } from "./tasks.state"

const selectTasksState = createSelector (({ tasks } : State) => tasks, state => state)

const selectTasks = createSelector (selectTasksState, ({ tasks }) => tasks)

const selectTask = createSelector (selectTasksState, ({ selectedTask }) => selectedTask)

export { selectTasksState, selectTasks, selectTask }
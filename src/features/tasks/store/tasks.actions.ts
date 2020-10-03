import { Task, Tasks } from "@app/features/tasks/models"
import { createAction } from "@reduxjs/toolkit"

const LoadTasks = createAction ("[Tasks] LoadTasks")

const LoadTasksSuccess = createAction<Tasks> ("[Tasks] LoadTasksSuccess")

const AddTask = createAction<Task> ("[Tasks] AddTask")

const RemoveTask = createAction<string> ("[Tasks] RemoveTask")

const UpdateTask = createAction<Task> ("[Tasks] UpdateTask")

const SelectTask = createAction<Task | null> ("[Task] SelectTask")

type TasksActions =
    | typeof LoadTasks
    | typeof AddTask
    | typeof RemoveTask
    | typeof UpdateTask
    | typeof LoadTasksSuccess
    | typeof SelectTask

export type { TasksActions }
export { LoadTasks, AddTask, RemoveTask, UpdateTask, LoadTasksSuccess, SelectTask }

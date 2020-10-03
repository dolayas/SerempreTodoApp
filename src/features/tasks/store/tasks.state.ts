import { Task, Tasks } from "@app/features/tasks/models"

interface TasksState
{
    readonly selectedTask : Task | null

    readonly tasks : Tasks
}

interface State
{
    readonly tasks : TasksState
}

const initialState : TasksState =
{
    selectedTask : null,
    tasks : []
}

export type { TasksState, State }
export { initialState }
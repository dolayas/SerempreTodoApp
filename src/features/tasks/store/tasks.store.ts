import { IEpicModule } from "redux-dynamic-modules-observable"

import { LoadTasks } from "./tasks.actions"
import { tasksEffects } from "./tasks.effects"
import { reducer } from "./tasks.reducer"
import { State } from "./tasks.state"

const tasksModule : IEpicModule<State> =
{
    epics : tasksEffects,
    id : "tasks",
    initialActions : [ LoadTasks () ],
    reducerMap : {
        tasks : reducer
    }
}

export { tasksModule }
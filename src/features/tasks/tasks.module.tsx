import { createElement, FC, Suspense } from "react"
import { renderRoutes } from "react-router-config"
import { DynamicModuleLoader } from "redux-dynamic-modules"

import { tasksModule } from "@app/features/tasks/store"
import { Loading } from "@app/shared/components"

import { routes } from "./tasks.routes"

const TasksModule : FC = () =>
    <DynamicModuleLoader modules={ [ tasksModule ] }>
        <Suspense fallback={ <Loading color="primary" message="Loading tasks..." showBackdrop={ false }/> }>
            { renderRoutes (routes) }
        </Suspense>
    </DynamicModuleLoader>

export { TasksModule as default }
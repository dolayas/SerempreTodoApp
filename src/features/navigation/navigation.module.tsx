import { createElement, FC, Suspense } from "react"
import { renderRoutes } from "react-router-config"
import { DynamicModuleLoader } from "redux-dynamic-modules"

import { navigationModule } from "@app/features/navigation/store"
import { Loading } from "@app/shared/components"

import { routes } from "./navigation.routes"

const NavigationModule : FC = () =>
    <DynamicModuleLoader modules={ [ navigationModule ] }>
        <Suspense fallback={ <Loading color="primary" showBackdrop={ false } message="Getting things ready..."/> }>
            { renderRoutes (routes) }
        </Suspense>
    </DynamicModuleLoader>

export { NavigationModule as default }
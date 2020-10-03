import { RouteConfig } from "react-router-config"

import { default as NavigationModule } from "@app/features/navigation"
import { redirectTo } from "@app/lib/react"

const routes : RouteConfig[] =
    [
        {
            component : redirectTo ({ to : "/home" }),
            exact : true,
            path : "/"
        },
        {
            component : NavigationModule,
            path : "/home"
        }
    ]

export { routes }
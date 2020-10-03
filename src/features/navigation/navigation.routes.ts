import { RouteConfig } from "react-router-config"

import { default as TasksModule } from "@app/features/tasks"
import { redirectTo } from "@app/lib/react"

import { HomePage } from "./pages"

const routes : RouteConfig[] =
    [
        {
            component : HomePage,
            path : "/home",
            routes :
            [
                {
                    component : TasksModule,
                    path : "/home/tasks"
                },
                {
                    component : redirectTo ({ exact : true, from : "/home", to : "/home/tasks"  }),
                }
            ]
        }
    ]

export { routes }
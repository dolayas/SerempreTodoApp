import { RouteConfig } from "react-router-config"

import { HistoryPage, TasksPage } from "./pages"

const routes : RouteConfig[] =
    [
        {
            component : TasksPage,
            exact : true,
            path : "/home/tasks"
        },
        {
            component : HistoryPage,
            path : "/home/tasks/history"
        }
    ]

export { routes }
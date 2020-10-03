import { lazy } from "react"

const TasksPage = lazy (() => import ("./tasks"))

const HistoryPage = lazy (() => import ("./history"))

export { TasksPage, HistoryPage }
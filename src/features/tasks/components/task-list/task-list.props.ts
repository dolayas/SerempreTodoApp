import { ChangeEvent, MouseEvent } from "react"

import { Task, Tasks } from "@app/features/tasks/models"

import { TaskEventHandler } from "../task-list-item"

interface TaskListProps
{
    readonly items : Tasks

    readonly onTaskSelect ?: TaskEventHandler

    readonly onStatusChange ?: (task : Task, event : ChangeEvent<HTMLInputElement>) => void

    readonly onTaskDelete ?: (id : string, event : MouseEvent<HTMLButtonElement>) => void
}

export type { TaskListProps }
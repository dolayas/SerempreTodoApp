import { ChangeEventHandler, MouseEvent, MouseEventHandler } from "react"

import { Task, TaskStatus } from "@app/features/tasks/models"

type TaskEventHandler = (event : MouseEvent, task ?: Task) => void

interface TaskListItemProps
{
    readonly className ?: string

    readonly subject : string

    readonly dueDate ?: Date

    readonly notes ?: boolean

    readonly attachments ?: boolean

    readonly status ?: TaskStatus

    readonly task ?: Task

    readonly onTaskSelect ?: TaskEventHandler

    readonly onStatusChange ?: ChangeEventHandler<HTMLInputElement>

    readonly onTaskDelete ?: MouseEventHandler<HTMLButtonElement>
}

export type { TaskListItemProps, TaskEventHandler }
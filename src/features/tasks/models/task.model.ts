import { firestore } from "firebase/app"

import { TaskAttachments } from "./task-attachments.model"
import { TaskStatus } from "./task-status.model"

interface Task
{
    readonly id : string

    readonly subject : string

    readonly dueDate : Date | null

    readonly linkedAttachments : TaskAttachments

    readonly notes : string

    readonly status : TaskStatus

    readonly createdDateTime : Date

    readonly location : firestore.GeoPoint | null
}

interface TaskInit
{
    readonly id ?: string

    readonly subject : string

    readonly dueDate ?: Date | null | string

    readonly linkedAttachments ?: TaskAttachments

    readonly notes ?: string

    readonly status ?: TaskStatus | boolean

    readonly createdDateTime ?: Date | string

    readonly location ?: firestore.GeoPoint | null
}

type Tasks = readonly Task[]

const Task = ({
    subject,
    createdDateTime = new Date (),
    dueDate = null,
    linkedAttachments = [],
    notes = "",
    status = TaskStatus.NotStarted,
    id = "null",
    location = null
} : TaskInit) : Task =>
    ({
        createdDateTime : typeof createdDateTime === "string" ? new Date (createdDateTime) : createdDateTime,
        dueDate : typeof dueDate === "string" ? new Date (dueDate) : dueDate,
        id,
        linkedAttachments : linkedAttachments.map (file => typeof file === "string" ? JSON.parse (file) : file),
        location,
        notes,
        status : typeof status === "boolean"
            ? status
                ? "Completed"
                : "NotStarted"
            : status,
        subject
    })

const Tasks = (...tasks : TaskInit[]) : Tasks =>
    tasks.map (Task)

export type { TaskInit }
export { Task, Tasks }
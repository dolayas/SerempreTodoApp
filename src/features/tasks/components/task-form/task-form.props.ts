import { MouseEvent, MouseEventHandler } from "react"
import { SubmitHandler } from "react-hook-form"

import { TaskAttachments } from "@app/features/tasks/models"
import { ValidationForm } from "@app/lib/react"

interface TaskFormProps
{
    readonly initialValues : Partial<TaskFormValues>

    readonly onSubmit ?: SubmitHandler<TaskFormValues>

    readonly onClose ?: MouseEventHandler<HTMLButtonElement>

    readonly onDelete ?: (id : string, e : MouseEvent<HTMLButtonElement>) => void
}

interface TaskFormValues
{
    readonly id : string

    readonly subject : string

    readonly completed : boolean

    readonly dueDate : Date | null

    readonly notes : string

    readonly files : TaskAttachments

    readonly createdDateTime : Date
}

const TaskFormValidation : ValidationForm<TaskFormValues> =
{
    completed : { required : false },
    createdDateTime : { required : true },
    dueDate : { required : false },
    files : { required : false },
    id : { required : true },
    notes : { required : false },
    subject : { maxLength : 255, minLength : 3, required : true }
}

export type { TaskFormProps, TaskFormValues }
export { TaskFormValidation }
import { SubmitHandler } from "react-hook-form"

import { ValidationForm } from "@app/lib/react"

interface AddTaskProps
{
    onSubmit ?: SubmitHandler<AddTaskFormValues>
}

interface AddTaskFormValues
{
    readonly completed : boolean

    readonly subject : string
}

const AddTaskFormValidation : ValidationForm<AddTaskFormValues> =
{
    completed : { required : false },
    subject :
    {
        maxLength : 255,
        minLength : 3,
        required : true
    }
}

export type { AddTaskProps, AddTaskFormValues }
export { AddTaskFormValidation }
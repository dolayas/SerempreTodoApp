import { ChangeEventHandler, MouseEvent } from "react"

import { TaskAttachment, TaskAttachments } from "@app/features/tasks/models"

interface InputFileProps
{
    readonly files : TaskAttachments

    readonly onDelete ?: (e : MouseEvent<HTMLButtonElement>, file : TaskAttachment, index : number) => void

    readonly onChange ?: ChangeEventHandler<HTMLInputElement>
}

export type { InputFileProps  }
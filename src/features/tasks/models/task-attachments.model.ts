interface TaskAttachment
{
    readonly displayName : string

    readonly type : string

    readonly size : number

    readonly webLink : string
}

interface TaskAttachmentInit
{
    readonly displayName : string

    readonly type : string

    readonly size : number

    readonly webLink : string
}

type TaskAttachments = readonly TaskAttachment[]

const TaskAttachment = ({
    displayName,
    size = 0,
    type = "File",
    webLink
} : TaskAttachmentInit) : TaskAttachment =>
    ({
        displayName,
        size,
        type,
        webLink
    })

const TaskAttachments = (...attachments : TaskAttachmentInit[]) : TaskAttachments =>
    attachments.map (TaskAttachment)

export type { TaskAttachmentInit }
export { TaskAttachment, TaskAttachments }
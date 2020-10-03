import { createElement, FC } from "react"

import { Box } from "@material-ui/core"

import { TaskListItem } from "../task-list-item"
import { TaskListProps } from "./task-list.props"

const TaskList : FC<TaskListProps> = ({ items, onStatusChange, onTaskDelete, onTaskSelect }) =>
{
    return (
        <Box display="flex" flexDirection="column" overflow="auto">
            {
                Array
                    .from (items)
                    .map (({ id, subject, status, dueDate, notes, linkedAttachments, createdDateTime, location }, index) =>
                        <TaskListItem
                            key={ id }
                            subject={ subject }
                            status={ status }
                            attachments={ linkedAttachments.length > 0 }
                            notes={ notes.length > 0 }
                            dueDate={ dueDate || undefined }
                            task={ items[ index ] }
                            onTaskDelete={ e => onTaskDelete && onTaskDelete (id, e) }
                            onStatusChange={ e => onStatusChange && onStatusChange ({
                                createdDateTime,
                                dueDate,
                                id,
                                linkedAttachments,
                                location,
                                notes,
                                status : e.target.checked ? "Completed" : "NotStarted",
                                subject
                            }, e) }
                            onTaskSelect={ onTaskSelect }/>)
            }
        </Box>
    )
}

export { TaskList }
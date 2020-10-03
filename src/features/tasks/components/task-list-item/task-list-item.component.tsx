import { default as classNames } from "classnames"
import {
    CalendarRangeOutline as CalendarRangeOutlineIcon,
    CheckboxBlankCircleOutline as CheckboxBlankCircleOutlineIcon,
    CheckboxMarkedCircle as CheckboxMarkedCircleIcon,
    CheckboxMarkedCircleOutline as CheckboxMarkedCircleOutlineIcon, FileOutline as FileOutlineIcon,
    Paperclip as PaperclipIcon, TrashCan as TrashIcon
} from "mdi-material-ui"
import { createElement, FC, MouseEventHandler, useState } from "react"

import { Box, Checkbox, IconButton, Paper, Tooltip, Typography } from "@material-ui/core"

import { TaskListItemProps } from "./task-list-item.props"
import { useStyles } from "./task-list-item.styles"

const TaskListItem : FC<TaskListItemProps> = ({
    className,
    subject,
    status,
    attachments,
    dueDate,
    notes,
    task,
    onTaskSelect,
    onStatusChange,
    onTaskDelete
}) =>
{
    const classes = useStyles ()

    const [ isHovered, setIsHovered ] = useState (false)

    const handleMouseEnter : MouseEventHandler = () => setIsHovered (true)

    const handleMouseLeave : MouseEventHandler = () => setIsHovered (false)

    return (
        <Paper
            className={ classNames (classes.paper, className) }>
            <Box className={ classes.statusButton }>
                <Tooltip title={`Mark as ${ status === "Completed" ? "not" : "" } completed`} arrow>
                    <Checkbox
                        onMouseEnter={ handleMouseEnter }
                        onMouseLeave={ handleMouseLeave }
                        checkedIcon={ <CheckboxMarkedCircleIcon color="primary"/> }
                        icon={ isHovered && status !== "Completed"
                            ? <CheckboxMarkedCircleOutlineIcon/>
                            : <CheckboxBlankCircleOutlineIcon/> }
                        checked={ status === "Completed" }
                        onChange={ onStatusChange }
                        color="default"/>
                </Tooltip>
            </Box>
            <Box
                className={ classes.paperBody }
                onClick={ e => onTaskSelect && onTaskSelect (e, task) }>
                <Box>
                    <Typography className={ classNames ({ [ classes.subject ] : status === "Completed" }) }>{ subject }</Typography>
                    <Typography className={ classes.paperBodyDetails } component="div">
                        {
                            Boolean (dueDate) && <span className={ classes.paperBodyDetail }>
                                <CalendarRangeOutlineIcon fontSize="small"/>
                                &nbsp;
                                {
                                    dueDate!.toLocaleString ("default", {
                                        day : "numeric",
                                        month : "short",
                                        weekday : "short",
                                        year : "numeric"
                                    })
                                }
                            </span>
                        }
                        {
                            attachments && <span className={ classes.paperBodyDetail }>
                                <FileOutlineIcon fontSize="small"/>
                            </span>
                        }
                        {
                            notes && <span className={ classes.paperBodyDetail }>
                                <PaperclipIcon fontSize="small"/>
                            </span>
                        }
                    </Typography>
                </Box>
                <Box marginLeft="auto">
                    <IconButton onClick={ onTaskDelete }>
                        <TrashIcon/>
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    )
}

export { TaskListItem }
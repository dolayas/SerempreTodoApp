import { default as classNames } from "classnames"
import { firestore } from "firebase/app"
import { createElement, MouseEvent, useRef, useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"

import {
    AddTask, AddTaskFormValues, TaskEventHandler, TaskForm, TaskFormValues, TaskList
} from "@app/features/tasks/components"
import { Task } from "@app/features/tasks/models"
import * as fromTasks from "@app/features/tasks/store"
import { PageComponent } from "@app/lib/react"
import { Box, Drawer, Hidden, Paper, Theme, Typography, useMediaQuery } from "@material-ui/core"

import { useStyles } from "./tasks.styles"

const { GeoPoint } = firestore

const TasksPage : PageComponent = () =>
{
    const addFormRef = useRef<HTMLFormElement | null> (null)

    const taskFormRef = useRef<HTMLFormElement | null> (null)

    const classes = useStyles ()

    const dispatch = useDispatch ()

    const tasks = useSelector (fromTasks.selectTasks)

    const selectedTask = useSelector (fromTasks.selectTask)

    const [ open, setOpen ] = useState (false)

    const matches = useMediaQuery<Theme> (({ breakpoints }) => breakpoints.down ("sm"))

    const handleAddSubmit : SubmitHandler<AddTaskFormValues> = ({ completed, ...data }) =>
    {
        const { current } = addFormRef

        dispatch (fromTasks.AddTask (Task ({ status : completed, ...data })))

        current!.reset ()
    }

    const handleSubmit : SubmitHandler<TaskFormValues> = ({ completed, files : linkedAttachments, ...data }) =>
    {
        const { geolocation } = navigator

        geolocation.getCurrentPosition (({ coords : { latitude, longitude } }) =>
        {
            dispatch (fromTasks.UpdateTask (Task ({
                linkedAttachments,
                location : new GeoPoint (latitude, longitude),
                status : completed,
                ...data
            })))
        }, () =>
        {
            dispatch (fromTasks.UpdateTask (Task ({
                linkedAttachments,
                location : null,
                status : completed,
                ...data
            })))
        })

        handleClose ()
    }

    const handleTaskSelect : TaskEventHandler = (_, task) =>
    {
        dispatch (fromTasks.SelectTask (task!))

        setOpen (true)
    }

    const handleTaskDelete = (id : string, e : MouseEvent<HTMLButtonElement>) =>
    {
        e.stopPropagation ()

        dispatch (fromTasks.RemoveTask (id))

        setOpen (false)
    }

    const handleClose = () =>
    {
        dispatch (fromTasks.SelectTask (null))

        setOpen (false)
    }

    const handleStatusChange = (task : Task) =>
    {
        dispatch (fromTasks.UpdateTask (task))
    }

    return (
        <Box display="flex" flexDirection="row" height="100%" overflow="hidden">
            <Box
                component="main"
                display="flex"
                flexDirection="column"
                flex="1 1 auto"
                overflow="hidden"
                className={ classNames (classes.content) }>
                <Box component="header" display="flex" flexDirection="row" marginBottom={ 2 }>
                    <Box flexGrow="1">
                        <Typography color="primary" variant="h5">Tasks</Typography>
                    </Box>
                </Box>
                <AddTask onSubmit={ handleAddSubmit } ref={ addFormRef }/>
                <TaskList
                    items={ tasks }
                    onTaskSelect={ handleTaskSelect }
                    onTaskDelete={ handleTaskDelete }
                    onStatusChange={ handleStatusChange }/>
            </Box>
            <Hidden smUp implementation="css">
                <Drawer
                    open={ open && matches }
                    variant="temporary"
                    anchor="right"
                    onClose={ () => setOpen (false) }
                    classes={{ paper : classes.drawerPaper }}
                    keepMounted>
                    {
                        selectedTask && <TaskForm
                            ref={ taskFormRef }
                            onSubmit={ handleSubmit }
                            initialValues={ {
                                completed : selectedTask.status === "Completed",
                                createdDateTime : selectedTask.createdDateTime,
                                dueDate : selectedTask.dueDate,
                                files : selectedTask.linkedAttachments,
                                id : selectedTask.id,
                                notes : selectedTask.notes,
                                subject : selectedTask.subject
                            } }
                            onClose={ handleClose }
                            onDelete={ handleTaskDelete }/>
                    }
                </Drawer>
            </Hidden>
            <Hidden xsDown smDown implementation="css">
                <Paper className={ classNames (classes.drawerPaper, { [classes.drawerPaperShift] : !open }) }>
                    {
                        selectedTask && <TaskForm
                            ref={ taskFormRef }
                            onSubmit={ handleSubmit }
                            initialValues={ {
                                completed : selectedTask.status === "Completed",
                                createdDateTime : selectedTask.createdDateTime,
                                dueDate : selectedTask.dueDate,
                                files : selectedTask.linkedAttachments,
                                id : selectedTask.id,
                                notes : selectedTask.notes,
                                subject : selectedTask.subject
                            } }
                            onClose={ handleClose }
                            onDelete={ handleTaskDelete }/>
                    }
                </Paper>
            </Hidden>
        </Box>
    )
}

export { TasksPage }
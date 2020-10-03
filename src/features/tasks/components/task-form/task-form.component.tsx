import {
    CheckboxBlankCircleOutline as CheckboxBlankCircleOutlineIcon,
    CheckboxMarkedCircle as CheckboxMarkedCircleIcon, ChevronRight as ChevronRightIcon,
    ContentSave as SaveIcon, TrashCan as TrashCanIcon
} from "mdi-material-ui"
import {
    ChangeEventHandler, createElement, forwardRef, MouseEvent, useEffect, useState
} from "react"
import { useForm } from "react-hook-form"
import { map } from "rxjs/operators"

import { TaskAttachment, TaskAttachments } from "@app/features/tasks/models"
import { filesToBase64 } from "@app/lib/util"
import { Box, Checkbox, IconButton, InputAdornment, TextField, Typography } from "@material-ui/core"

import { DatePicker, InputFile } from "../input"
import { TaskFormProps, TaskFormValidation } from "./task-form.props"
import { useStyles } from "./task-form.styles"

const TaskForm = forwardRef<HTMLFormElement, TaskFormProps> (({ initialValues, onSubmit, onClose, onDelete }, ref) =>
{
    const classes = useStyles ()

    const { handleSubmit, control, register } = useForm ({
        defaultValues : { ...initialValues },
        mode : "onChange"
    })

    const [ selectedDate, handleDateChange ] = useState (initialValues.dueDate || null)

    const [ files, setFiles ] = useState<TaskAttachments> (initialValues.files || [])

    const handleFileChange : ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) =>
    {
        filesToBase64 (currentTarget.files! || [])
            .pipe (
                map (xs => xs
                    .map (([ { size, name : displayName, type }, webLink ]) =>
                        TaskAttachment ({ displayName, size, type, webLink }))
                )
            )
            .subscribe ({
                next : data =>
                {
                    const fileNames = data.map (({ displayName }) => displayName)

                    setFiles (
                        [
                            ...files.filter (({ displayName }) => !fileNames.includes (displayName)),
                            ...data
                        ]
                    )
                }
            })

    }

    const handleFileDelete = (_ : MouseEvent<HTMLButtonElement>, __: TaskAttachment, fileIndex : number) =>
    {
        setFiles (files.filter ((_, index) => index !== fileIndex))
    }

    useEffect (() =>
    {
        register ("files", TaskFormValidation.files)

        register ("dueDate", TaskFormValidation.dueDate)

        register ("id", TaskFormValidation.id)

        register ("createdDateTime", TaskFormValidation.createdDateTime)
    }, [])

    useEffect (() =>
    {
        control.setValue ("dueDate", selectedDate)

        control.setValue ("files", files)
    }, [ selectedDate, files ])

    return (
        <form
            ref={ ref }
            className={ classes.form }
            onSubmit={ onSubmit && handleSubmit (onSubmit) }
            noValidate
            autoComplete="off">
            <Box display="flex" flexDirection="column" flexGrow="1" overflow="hidden auto">
                <TextField
                    type="text"
                    name="subject"
                    label=""
                    variant="outlined"
                    fullWidth
                    inputRef={ register (TaskFormValidation.subject) }
                    InputProps={ {
                        classes : {
                            adornedStart : classes.inputAdornment,
                            input : classes.input,
                            notchedOutline : classes.notesInput
                        },
                        endAdornment : <InputAdornment position="end">
                            <IconButton type="submit">
                                <SaveIcon/>
                            </IconButton>
                        </InputAdornment>,
                        startAdornment : <InputAdornment position="start">
                            <Checkbox
                                name="completed"
                                checkedIcon={ <CheckboxMarkedCircleIcon color="primary"/> }
                                icon={ <CheckboxBlankCircleOutlineIcon/> }
                                defaultChecked={ initialValues.completed }
                                inputRef={ register (TaskFormValidation.completed) }
                                color="default"/>
                        </InputAdornment>
                    } }/>
                <DatePicker
                    value={selectedDate}
                    onChange={ handleDateChange }
                    onClear={ () => handleDateChange (null) }/>
                <InputFile
                    files={ files }
                    onChange={ handleFileChange }
                    onDelete={ handleFileDelete }/>
                <TextField
                    name="notes"
                    label=""
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={ 7 }
                    placeholder="Add note"
                    InputProps={{ classes : { notchedOutline : classes.notesInput } }}
                    inputRef={ register (TaskFormValidation.notes) }/>
            </Box>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between">
                <IconButton onClick={ onClose }>
                    <ChevronRightIcon/>
                </IconButton>
                {
                    initialValues.createdDateTime && <Typography>
                    Created at&nbsp;
                        {
                            initialValues.createdDateTime!.toLocaleString ("default", {
                                day : "numeric",
                                month : "short",
                                weekday : "short",
                                year : "numeric"
                            })
                        }
                    </Typography>
                }
                <IconButton onClick={ e => onDelete && onDelete (initialValues.id!, e) }>
                    <TrashCanIcon/>
                </IconButton>
            </Box>
        </form>
    )
})

export { TaskForm }
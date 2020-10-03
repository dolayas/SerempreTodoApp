import {
    CheckboxBlankCircleOutline as CheckboxBlankCircleOutlineIcon,
    CheckboxMarkedCircle as CheckboxMarkedCircleIcon, Plus as PlusIcon
} from "mdi-material-ui"
import { ChangeEventHandler, createElement, forwardRef, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { Checkbox, IconButton, InputAdornment, TextField } from "@material-ui/core"

import { AddTaskFormValidation, AddTaskFormValues, AddTaskProps } from "./add-task.props"
import { useStyles } from "./add-task.styles"

const AddTask = forwardRef<HTMLFormElement, AddTaskProps> (({ onSubmit }, ref) =>
{
    const classes = useStyles ()

    const { handleSubmit, register, control, reset } = useForm<AddTaskFormValues> ({
        defaultValues :
        {
            subject : ""
        },
        mode : "all"
    })

    const [ isFilled, setIsFilled ] = useState (false)

    const [ checked, setChecked ] = useState (false)

    useEffect (() =>
    {
        register ("completed", AddTaskFormValidation.completed)
    }, [])

    useEffect (() =>
    {
        const value = control.getValues ("subject")

        setIsFilled (value && value.length > 0 || false)
    }, [ control ])

    const handleReset = () =>
    {
        reset ({ completed : false, subject : "" })

        setChecked (false)
    }

    const handleChange : ChangeEventHandler<HTMLInputElement> = ({ currentTarget : { checked } }) =>
    {
        setChecked (checked)

        control.setValue ("completed", checked)
    }

    return (
        <form
            className={ classes.form }
            ref={ ref }
            onSubmit={ onSubmit && handleSubmit (onSubmit) }
            noValidate
            autoComplete="off"
            onReset={ handleReset }>
            <TextField
                type="text"
                name="subject"
                variant="filled"
                label=""
                fullWidth
                InputProps={ {
                    endAdornment : isFilled && <InputAdornment position="end">
                        <IconButton type="submit">
                            <PlusIcon/>
                        </IconButton>
                    </InputAdornment>,
                    startAdornment : <InputAdornment position="start">
                        <Checkbox
                            name="completed"
                            checkedIcon={ <CheckboxMarkedCircleIcon color="primary"/> }
                            icon={ <CheckboxBlankCircleOutlineIcon/> }
                            checked={ checked }
                            onChange={ handleChange }
                            color="default"/>
                    </InputAdornment>
                } }
                inputRef={ register (AddTaskFormValidation.subject) }
                placeholder="Add a task"/>
        </form>
    )
})

export { AddTask }
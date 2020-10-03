import { CalendarMonth as CalendarMonthIcon, Close as CloseIcon } from "mdi-material-ui"
import { createElement, FC, useState } from "react"

import {
    IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText
} from "@material-ui/core"
import { DatePicker as MuiDatePicker } from "@material-ui/pickers"

import { DatePickerProps } from "./date-picker.props"
import { useStyles } from "./input.styles"

const DatePicker : FC<DatePickerProps> = ({ value, onChange, onClear }) =>
{
    const [ open, setOpen ] = useState (false)

    const classes = useStyles ()

    return (
        <List>
            <ListItem
                button
                disableRipple>
                <ListItemIcon onClick={ () => setOpen (true) }>
                    <CalendarMonthIcon/>
                </ListItemIcon>
                <ListItemText primary={
                    <MuiDatePicker
                        autoOk
                        open={ open }
                        variant="inline"
                        onClose={ () => setOpen (false) }
                        format="d MMM yyyy"
                        value={ value }
                        placeholder="Add due date"
                        InputProps={{ classes : { underline : classes.input } }}
                        onChange={ onChange }/>
                }/>
                {
                    value && <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={ onClear }>
                            <CloseIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                }
            </ListItem>
        </List>
    )
}

export { DatePicker }
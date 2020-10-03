import { Delete as DeleteIcon, File as FileIcon, Paperclip as PaperclipIcon } from "mdi-material-ui"
import { createElement, FC, Fragment } from "react"

import {
    IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText
} from "@material-ui/core"

import { InputFileProps } from "./input-file.props"
import { useStyles } from "./input.styles"

const InputFile : FC<InputFileProps> = ({ files, onChange, onDelete }) =>
{
    const classes = useStyles ()

    return (
        <List>
            <Fragment>
                {
                    Array
                        .from (files)
                        .map (({ displayName, size, type, webLink }, key) => <ListItem
                            key={ key }
                            button
                            disableRipple>
                            <ListItemIcon>
                                <FileIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary={ <a className={ classes.downloadLink } href={ webLink } target="_blank" rel="noopener" download>{ displayName }</a> }
                                secondary={ `${ Math.round (size / 1000) } KB ${ type }` } />
                            <ListItemSecondaryAction>
                                <IconButton
                                    onClick={ e => onDelete && onDelete (e, { displayName, size, type, webLink }, key)}
                                    edge="end">
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>)
                }
            </Fragment>
            <ListItem button disableRipple>
                <ListItemIcon>
                    <PaperclipIcon/>
                </ListItemIcon>
                <ListItemText primary={
                    <Fragment>
                        <input
                            type="file"
                            accept="image/*,.pdf"
                            multiple
                            className={ classes.fileInput }
                            onChange={ onChange }/>
                    </Fragment>
                }/>
            </ListItem>
        </List>
    )
}

export { InputFile }
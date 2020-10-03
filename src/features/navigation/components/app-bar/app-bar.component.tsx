import {
    AccountCircle as AccountCircleIcon, LogoutVariant as LogoutVariantIcon
} from "mdi-material-ui"
import { createElement, FC, MouseEventHandler, useState } from "react"

import {
    AppBar as MuiAppBar, Avatar, Box, Divider, IconButton, ListItemAvatar, ListItemIcon,
    ListItemText, Menu, MenuItem, Toolbar, Typography
} from "@material-ui/core"

import { AppBarProps } from "./app-bar.props"
import { useStyles } from "./app-bar.styles"

const AppBar : FC<AppBarProps> = ({ children }) =>
{
    const classes = useStyles ()

    const [ anchorEl, setAnchorEl ] = useState<Element | null> (null)

    const handleMenuOpen : MouseEventHandler = ({ currentTarget }) => setAnchorEl (currentTarget)

    const handleMenuClose = () => setAnchorEl (null)

    return (
        <MuiAppBar position="sticky" color="default">
            <Toolbar className={ classes.toolbar }>
                <Box display="flex" flexGrow="1" mx={ 1 }>
                    { children }
                </Box>
                <Typography variant="h6">
                    Deiby Olaya
                </Typography>
                <IconButton onClick={ handleMenuOpen }>
                    <Avatar>
                        DO
                    </Avatar>
                </IconButton>
                <Menu
                    id="menu-app-bar"
                    open={ Boolean (anchorEl) }
                    anchorEl={ anchorEl }
                    keepMounted
                    onClose={ handleMenuClose }
                    anchorOrigin={ {
                        horizontal : "right",
                        vertical: "top",
                    } }
                    transformOrigin={ {
                        horizontal : "right",
                        vertical : "top",
                    } }>
                    <MenuItem disableRipple disabled className={ classes.menuItem }>
                        <ListItemAvatar>
                            <Avatar>
                                DO
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Deiby Olaya Orejuela" secondary="dolayas@outlook.com" />
                    </MenuItem>
                    <Divider/>
                    <MenuItem onClick={ handleMenuClose }>
                        <ListItemIcon>
                            <AccountCircleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Profile"/>
                    </MenuItem>
                    <MenuItem onClick={ handleMenuClose }>
                        <ListItemIcon>
                            <LogoutVariantIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Logout"/>
                    </MenuItem>
                </Menu>
            </Toolbar>
        </MuiAppBar>
    )
}

export { AppBar }
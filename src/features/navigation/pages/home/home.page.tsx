import {
    CheckAll as CheckAllIcon, History as HistoryIcon, WeatherPartlyCloudy as WeatherPartlyCloudyIcon
} from "mdi-material-ui"
import { ChangeEvent, createElement, Suspense, useState } from "react"
import { renderRoutes } from "react-router-config"
import { NavLink } from "react-router-dom"

import { AppBar } from "@app/features/navigation/components"
import { PageComponent } from "@app/lib/react"
import { Loading } from "@app/shared/components"
import { BottomNavigation, BottomNavigationAction, Box, Typography } from "@material-ui/core"

import { useStyles } from "./home.styles"

const HomePage : PageComponent = ({ route }) =>
{
    const classes = useStyles ()

    const [ value, setValue ] = useState (window.location.pathname)

    const handleNavigationChange = (_ : ChangeEvent<{}>, newValue : string) =>
        setValue (newValue)

    return (
        <div className={ classes.homePage }>
            <AppBar>
                <WeatherPartlyCloudyIcon htmlColor="#DB7532" className={ classes.titleIcon } fontSize="large"/>
                <Typography variant="h6">
                    {
                        new Date ()
                            .toLocaleDateString ("default", { day : "numeric", month : "long", weekday : "long", year : "numeric" })
                    }
                </Typography>
            </AppBar>
            <Box
                flex="1 1 auto"
                overflow="auto"
                alignSelf="stretch"
                paddingX={ 2 }
                paddingY={ 2 }>
                <Suspense fallback={ <Loading color="primary" showBackdrop={ false } message=""/> }>
                    { renderRoutes (route && route.routes) }
                </Suspense>
            </Box>
            <BottomNavigation
                className={ classes.bottomNavigation }
                value={ value }
                onChange={ handleNavigationChange }
                showLabels>
                <BottomNavigationAction
                    component={ NavLink }
                    to="/home/tasks"
                    value="/home/tasks"
                    label="Tasks"
                    icon={ <CheckAllIcon/> }/>
                <BottomNavigationAction
                    component={ NavLink }
                    to="/home/tasks/history"
                    value="/home/tasks/history"
                    label="History"
                    icon={ <HistoryIcon/> }/>
            </BottomNavigation>
        </div>
    )
}

export { HomePage }
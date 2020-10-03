import { default as GoogleMap } from "google-map-react"
import { MapMarker } from "mdi-material-ui"
import { createElement, FC, useState } from "react"
import { useSelector } from "react-redux"

import { Environment } from "@app/environments"
import { Task } from "@app/features/tasks/models"
import * as fromTasks from "@app/features/tasks/store"
import { PageComponent } from "@app/lib/react"
import { Box, Icon, TextField } from "@material-ui/core"
import { default as Autocomplete } from "@material-ui/lab/Autocomplete"

import { useStyles } from "./history.styles"

const { GoogleMapAPIKey } = Environment

const Maker : FC<{ lat : number, lng : number }> = () =>
    <Icon fontSize="large">
        <MapMarker htmlColor="#DB4336"/>
    </Icon>

const HistoryPage : PageComponent = () =>
{
    const classes = useStyles ()

    const tasks = useSelector (fromTasks.selectTasks)

    const [ location, setLocation ] = useState ({ lat : 4.711929, lng : -74.064228 })

    const [ value, setValue ] = useState<Task | null> (null)

    const [ inputValue, setInputValue ] = useState ("")

    return (
        <Box display="flex" flexDirection="column" height="100%" overflow="hidden">
            <Autocomplete
                className={ classes.searchBar }
                options={ tasks as Task[] }
                getOptionSelected={ ({ id }, task) => id === task.id }
                getOptionLabel={ ({ subject }) => subject }
                getOptionDisabled={ ({ location }) => location === null }
                inputValue={ inputValue }
                onChange={ (_, newValue) =>
                {
                    setValue (newValue)

                    if (newValue !== null)
                    {
                        const { location } = newValue!

                        setLocation ({ lat : location!.latitude, lng : location!.longitude })
                    }
                } }
                onInputChange={ (_, newInputValue) => setInputValue (newInputValue) }
                value={ value }
                renderInput={ (params) => <TextField {...params} label="Select a task" variant="filled"/> }/>
            <GoogleMap
                center={ location }
                bootstrapURLKeys={ { key : GoogleMapAPIKey } }
                defaultZoom={ 11 }
                yesIWantToUseGoogleMapApiInternals>
                {
                    Array
                        .from (tasks)
                        .filter (({ location }) => location !== null)
                        .map (({ location }, key) =>
                            <Maker
                                key={ key }
                                lat={ location!.latitude }
                                lng={ location!.longitude }/>)
                }
            </GoogleMap>
        </Box>
    )
}

export { HistoryPage }
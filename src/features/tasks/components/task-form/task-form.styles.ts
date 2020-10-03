import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles (({ typography, spacing }) =>
    ({
        form :
        {
            display : "flex",
            flexFlow : "column nowrap",
            height : "100%"
        },
        input :
        {
            ...typography.h6
        },
        inputAdornment :
        {
            paddingLeft : spacing (1)
        },
        notesInput :
        {
            border : "none"
        }
    }))

export { useStyles }
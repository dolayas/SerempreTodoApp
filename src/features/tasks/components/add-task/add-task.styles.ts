import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles (({ spacing }) =>
    ({
        form :
        {
            display : "flex",
            marginBottom : spacing (2)
        }
    }))

export { useStyles }
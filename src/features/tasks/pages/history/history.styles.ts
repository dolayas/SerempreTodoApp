import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles (({ spacing }) =>
    ({
        searchBar :
        {
            marginBottom : spacing (2)
        }
    }))

export { useStyles }
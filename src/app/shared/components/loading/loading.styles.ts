import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles (({ zIndex, palette }) =>
    ({
        backdrop :
        {
            color : palette.common.white,
            zIndex : zIndex.drawer + 1,
        }
    }))

export { useStyles }
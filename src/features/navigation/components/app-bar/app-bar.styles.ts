import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles (({ palette }) =>
    ({
        appBar :
        {

        },
        menuItem :
        {
            opacity : "1 !important"
        },
        toolbar :
        {
            background : palette.common.white,
            minHeight : 80
        }
    }))

export { useStyles }
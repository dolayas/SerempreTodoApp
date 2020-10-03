import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles (({ typography, palette }) =>
    ({
        downloadLink :
        {
            color : "inherit",
            cursor : "pointer",
            textDecoration : "none"
        },
        fileInput :
        {
            "&::-webkit-file-upload-button" :
            {
                visibility: "hidden"
            },
            "&::before" :
            {
                color : palette.text.hint,
                content : "'Add file'",
                ...typography.body1
            },
            color : "transparent",
            overflow : "hidden",
        },
        input :
        {
            "&::before, &::after" :
            {
                border : "none!important"
            },
            border : "none"
        }
    }))

export { useStyles }
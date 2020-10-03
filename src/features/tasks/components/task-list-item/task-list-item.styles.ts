import { fade, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles (({ palette, transitions, spacing }) =>
    ({
        paper :
        {
            "&:hover" :
            {
                background : fade (palette.background.paper, palette.action.hoverOpacity),
                cursor : "pointer"
            },
            display : "flex",
            flexFlow : "row nowrap",
            marginBottom : spacing (1),
            minHeight : 64,
            padding : spacing (1),
            transition : transitions.create  ([ "background-color", "box-shadow", "border" ], {
                duration : transitions.duration.short,
            })
        },
        paperBody :
        {
            display : "flex",
            flexFlow : "row nowrap",
            flexGrow : 1,
            placeContent : "start center"
        },
        paperBodyDetail :
        {
            "&:first-child" :
            {
                marginLeft : 0
            },
            display : "flex",
            flexFlow : "row nowrap" ,
            margin : `0 ${ spacing (1) }px`,
            placeContent : "start center"
        },
        paperBodyDetails :
        {
            "&:not(:first-child):not(:empty)" :
            {
                marginTop : spacing (1),
            },
            color : palette.text.hint,
            display : "flex",
            flexFlow : "row nowrap",
        },
        statusButton :
        {
            marginRight : spacing (1),
            transition : transitions.create ("all", {
                duration : transitions.duration.short,
            })
        },
        subject :
        {
            color : palette.text.hint,
            textDecoration : "line-through"
        }
    }))

export { useStyles }
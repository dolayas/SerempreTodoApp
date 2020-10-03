import { makeStyles } from "@material-ui/core/styles"

const drawerWidth = 360

const useStyles = makeStyles (({ spacing, transitions }) =>
    ({
        content :
        {
            marginRight : spacing (2),
            transition : transitions.create ("margin", {
                duration : transitions.duration.leavingScreen,
                easing : transitions.easing.sharp,
            }),
        },
        drawerPaper :
        {
            flexShrink : 0,
            height : "100%",
            overflow : "auto",
            padding : spacing (2),
            transition : transitions.create ("margin", {
                duration : transitions.duration.leavingScreen,
                easing : transitions.easing.sharp,
            }),
            width : drawerWidth
        },
        drawerPaperShift :
        {
            marginRight : -drawerWidth - spacing (2),
            transition : transitions.create ("margin", {
                duration : transitions.duration.enteringScreen,
                easing : transitions.easing.easeOut,
            }),
        }
    }))

export { useStyles }
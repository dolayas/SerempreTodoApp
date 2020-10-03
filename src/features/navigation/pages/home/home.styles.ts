import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles (({ spacing }) =>
    ({
        bottomNavigation :
        {
            width : "100%"
        },
        homePage :
        {
            display : "flex",
            flexFlow : "column nowrap",
            height : "100vh",
            overflow : "hidden"
        },
        titleIcon :
        {
            marginRight : spacing (2)
        }
    }))

export { useStyles }
import { createElement, FC, Fragment } from "react"

import { Backdrop, Box, CircularProgress, Typography } from "@material-ui/core"

import { LoadingProps } from "./loading.props"
import { useStyles } from "./loading.styles"

const LoaderContent : FC<Omit<LoadingProps, "showBackdrop">> = ({ message, color, loaderSize }) =>
    <Box
        display="flex"
        flex="1 1 auto"
        flexDirection="column"
        flexWrap="nowrap"
        justifyContent="center"
        alignItems="center"
        height="100%">
        <CircularProgress color={ color } disableShrink size={ loaderSize }/>
        <Box mt={ 1 }>
            <Typography variant="body1" color="inherit">{ message }</Typography>
        </Box>
    </Box>

const Loading : FC<LoadingProps> = ({ color = "inherit", message = "", showBackdrop = true, loaderSize }) =>
{
    const classes = useStyles ()

    return (
        <Fragment>
            {
                showBackdrop
                    ? (
                        <Backdrop className={ classes.backdrop } open={ showBackdrop }>
                            <LoaderContent color={ color } message={ message } loaderSize={ loaderSize } />
                        </Backdrop>
                    )
                    : <LoaderContent color={ color } message={ message } loaderSize={ loaderSize } />
            }
        </Fragment>
    )
}

export { Loading }
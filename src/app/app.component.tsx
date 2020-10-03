import { createElement, FC, StrictMode, Suspense } from "react"
import { hot } from "react-hot-loader/root"
import { Provider } from "react-redux"
import { renderRoutes } from "react-router-config"
import { BrowserRouter } from "react-router-dom"

import { Loading } from "@app/shared/components"
import { store } from "@app/store"
import { default as DateFnsUtils } from "@date-io/date-fns"
import { default as CssBaseline } from "@material-ui/core/CssBaseline"
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"

import { routes } from "./app.routes"
import { theme } from "./app.theme"

const App : FC = hot (() =>
    <StrictMode>
        <Provider store={ store }>
            <ThemeProvider theme={ theme }>
                <MuiPickersUtilsProvider utils={ DateFnsUtils }>
                    <StylesProvider injectFirst>
                        <CssBaseline />
                        <BrowserRouter>
                            <Suspense fallback={ <Loading color="primary" showBackdrop={ false } message=""/> }>
                                { renderRoutes (routes) }
                            </Suspense>
                        </BrowserRouter>
                    </StylesProvider>
                </MuiPickersUtilsProvider>
            </ThemeProvider>
        </Provider>
    </StrictMode>)

export { App }
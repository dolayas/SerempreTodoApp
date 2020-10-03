import { createElement, FC } from "react"
import { Redirect, RedirectProps } from "react-router-dom"

const redirectTo = (props : RedirectProps) : FC => () => createElement (Redirect, props)

export { redirectTo }
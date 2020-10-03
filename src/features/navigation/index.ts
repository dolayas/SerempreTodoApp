import { lazy } from "react"

const delay = (ms : number) => new Promise (resolve => setTimeout (resolve, ms))

export default lazy (() => delay (1000).then (() => import ("./navigation.module")))
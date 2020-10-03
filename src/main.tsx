import { createElement } from "react"
import { render } from "react-dom"

import { Environment } from "@app/environments"
import { App } from "@app/root"

import { ServiceWorker } from "./service-worker"

const bootstrap = async () =>
{
    document.addEventListener ("DOMContentLoaded", () =>
    {
        // Here your code
        render (<App/>, document.getElementById (Environment.AppMoundID))
    })

    if ( Environment.Production )
        await ServiceWorker.register ()
}

bootstrap ()
    .catch ((error : Error) => console.error ("Bootstrap", error))
    .then (() => ServiceWorker.unregister ())

export {}
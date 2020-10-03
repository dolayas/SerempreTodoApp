import { History, Location } from "history"
import { match } from "react-router-dom"

type Params = { [key : string] : any }

interface Router<HistoryLocationState>
{
    readonly history : History<HistoryLocationState>

    readonly location : Location<HistoryLocationState>

    readonly params : Params

    readonly routeMatch : match<Params>
}

export type { Router, Params }
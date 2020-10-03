import { useHistory, useLocation, useParams, useRouteMatch } from "react-router-dom"

import { Params, Router } from "./router"

const useRouter = <HistoryLocationState = unknown>() : Router<HistoryLocationState> =>
{
    const history = useHistory<HistoryLocationState> ()

    const location = useLocation<HistoryLocationState> ()

    const params = useParams<Params> ()

    const routeMatch = useRouteMatch<Params> ()

    return {
        history,
        location,
        params,
        routeMatch
    }
}

export { useRouter }
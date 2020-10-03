import { combineEpics, Epic } from "redux-observable"
import { filter, map } from "rxjs/operators"

import { LoadAppName } from "./root.actions"

const loadAppName : Epic = (actions) =>
    actions
        .pipe (
            filter (LoadAppName.match),
            map (({ payload }) => LoadAppName (`${ payload } with effect`))
        )

const rootEffects = combineEpics (loadAppName)

export { rootEffects }
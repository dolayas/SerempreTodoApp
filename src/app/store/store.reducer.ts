import { ReducersMapObject } from "@reduxjs/toolkit"

import * as fromRoot from "./root"
import { AppState } from "./store.state"

const reducers : ReducersMapObject<AppState> =
{
    root : fromRoot.reducer
}

export { reducers }
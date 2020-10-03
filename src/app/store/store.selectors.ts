import { createSelector } from "@reduxjs/toolkit"

import { AppState } from "./store.state"

const selectRootState = createSelector (({ root } : AppState) => root, state => state)

export { selectRootState }
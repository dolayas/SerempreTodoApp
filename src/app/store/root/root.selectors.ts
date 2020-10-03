import { createSelector } from "@reduxjs/toolkit"

import { selectRootState } from "../store.selectors"

const selectAppName = createSelector (selectRootState, ({ appName }) => appName)

export { selectAppName }
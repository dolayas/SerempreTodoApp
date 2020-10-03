import { createAction } from "@reduxjs/toolkit"

const LoadAppName = createAction<string> ("[Root] LoadAppName")

type RootActions = typeof LoadAppName

export type { RootActions }
export { LoadAppName }
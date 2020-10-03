interface RootState
{
    readonly appName : string
}

const initialState : RootState =
{
    appName : "React.js"
}

export type { RootState }
export { initialState }
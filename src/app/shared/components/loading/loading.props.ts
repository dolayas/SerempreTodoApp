interface LoadingProps
{
    readonly showBackdrop ?: boolean

    readonly message : string

    readonly color ?: "primary" | "secondary" | "inherit"

    readonly loaderSize ?: number | string
}

export type { LoadingProps }
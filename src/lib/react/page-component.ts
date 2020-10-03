import { FunctionComponent } from "react"
import { RouteConfigComponentProps } from "react-router-config"

import { Params } from "@app/shared/hooks"

interface PageComponent extends FunctionComponent<RouteConfigComponentProps<Params>> {}

export type { PageComponent }
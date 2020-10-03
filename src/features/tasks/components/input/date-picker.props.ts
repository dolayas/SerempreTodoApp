import { MouseEventHandler } from "react"

import { ParsableDate } from "@material-ui/pickers/constants/prop-types"
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date"

interface DatePickerProps
{
    readonly value : ParsableDate

    readonly onChange : (date :  MaterialUiPickersDate | null, value ?: string | null) => void

    readonly onClear ?: MouseEventHandler<HTMLButtonElement>
}

export type { DatePickerProps }
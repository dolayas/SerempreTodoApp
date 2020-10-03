import { ValidationRules } from "react-hook-form"

type ValidationForm<a> = Record<keyof a, ValidationRules | Record<string, ValidationRules> >

export type { ValidationForm }
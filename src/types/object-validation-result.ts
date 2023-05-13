export type ObjectValidationResult<ValidationErrorInfo, Value> = Value extends object ? {
  [Key in keyof Value]?: ObjectValidationResult<ValidationErrorInfo, Value[Key]>
} | ValidationErrorInfo[] : ValidationErrorInfo[]

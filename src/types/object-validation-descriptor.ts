import { ValidationFunction } from "./validation-function"

export type ObjectValidationDescriptor<
  ValidationErrorInfo,
  Value
> = Value extends object ? {
  [Key in keyof Value]?: ObjectValidationDescriptor<ValidationErrorInfo, Value[Key]>
} | ValidationFunction<ValidationErrorInfo, Value> : ValidationFunction<ValidationErrorInfo, Value>

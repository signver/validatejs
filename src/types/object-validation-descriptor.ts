import { ObjectValidationValueFunction } from "./validation-value-function";

export type ObjectValidationDescriptor<
  ValidationErrorInfo,
  Value extends {}
> = {
  [key in keyof Value]: ObjectValidationValueFunction<ValidationErrorInfo, Value[key]>;
};


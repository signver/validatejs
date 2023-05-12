import { ValidationFunction } from "./validation-function";

export type ObjectValidationDescriptor<
  ValidationErrorInfo,
  Value extends {}
> = {
  [key in keyof Value]: ValidationFunction<ValidationErrorInfo, Value[key]>;
};


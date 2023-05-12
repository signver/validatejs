import { ValidationFunction } from "./validation-function";

export type ObjectValidationResult<ValidationErrorInfo, Value extends {}> = {
  [key in keyof Value]: ReturnType<
    ValidationFunction<ValidationErrorInfo, Value[key]>
  >;
};

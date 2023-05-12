import {
  ObjectValidationDescriptor,
  ObjectValidationResult,
  ValidationFunction,
} from "./types";

export function objectValidate<
  ValidationErrorInfo,
  ObjectValue extends {} = {}
>(
  candidate: ObjectValue,
  validations: ObjectValidationDescriptor<ValidationErrorInfo, ObjectValue>
): ObjectValidationResult<ValidationErrorInfo, ObjectValue> {
  return Object.entries(validations).reduce((result, entry) => {
    const [key, validate] = entry as [
      keyof typeof candidate,
      ValidationFunction<
        ValidationErrorInfo,
        (typeof candidate)[keyof typeof candidate]
      >
    ];
    const validationResult = validate(candidate[key as keyof typeof candidate]);
    if (validationResult.length) result[key] = validationResult
    return result;
  }, {} as ObjectValidationResult<ValidationErrorInfo, ObjectValue>);
}

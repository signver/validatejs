import {
  EntryOf,
  ObjectValidationDescriptor,
  ObjectValidationResult,
  ValidationFunction,
} from "./types"

export function validate<ValidationErrorInfo, Value>(value: Value, validations: ObjectValidationDescriptor<ValidationErrorInfo, Value>) {
  const isNull = value === null
  const isObject = !isNull && typeof value === 'object'
  const isFunction = typeof validations === 'function'

  if (!isObject || isFunction) return (validations as ValidationFunction<ValidationErrorInfo, Value>)(value)
  return (Object.entries(validations) as [keyof typeof validations, ObjectValidationDescriptor<ValidationErrorInfo, EntryOf<typeof value, keyof typeof value>>][])
    .reduce((result, [key, validator]) => {
      const valueToValidate = value[key as keyof typeof value]
      Object.assign(
        result,
        {
          [key]: validate(valueToValidate as any, validator as ObjectValidationDescriptor<ValidationErrorInfo, any>)
        }
      )
      return result
    }, {} as ObjectValidationResult<ValidationErrorInfo, Value>)
}

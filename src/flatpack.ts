import { ObjectValidationResult } from './types'

export interface FlattenValidationErrorInfo<ValidationErrorInfo> {
    path: string
    data: ValidationErrorInfo[]
}

export interface FlatPackOptions<ValidationErrorInfo> {
    root?: string
    flattenedList?: FlattenValidationErrorInfo<ValidationErrorInfo>[]
}

export function flatpack<ValidationErrorInfo, Value>(object: ObjectValidationResult<ValidationErrorInfo, Value>, { root = "", flattenedList = [] }: FlatPackOptions<ValidationErrorInfo> = {}) {
    const isNull = object === null
    const isObject = !isNull && typeof object === 'object'
    const isArray = isObject && Array.isArray(object)

    if (!isObject) {
        return flattenedList
    }
    if (isArray && object.length > 0) {
        flattenedList.push({
            data: object,
            path: root
        })
        return flattenedList
    }
    for (const index in object) {
        flatpack(
            object[index] as ObjectValidationResult<ValidationErrorInfo, Value[keyof Value]>,
            {
                root: `${root}.${index}`,
                flattenedList
            }
        )
    }
    return flattenedList
}
import { validate } from "./object-validate"
import { ObjectValidationDescriptor } from "./types"

describe("validate", () => {
  describe("non-objects", () => {
    it("should return validation result", () => {
      const errorList = ['too small']
      const input = 1
      const validator = jest.fn((value: number) => {
        if (value < 2) return errorList
        return []
      })
      const result = validate(
        input,
        validator
      )
      expect(validator).toBeCalledWith(1)
      expect(result).toBe(errorList)
    })
  })
  describe("objects", () => {
    it("can be validated by a function", () => {
      const errorList = ['error 1', 'error 2']
      const input = {
        test1: 1,
        test2: [],
        test3: {
          test4: {}
        }
      }
      const validator: ObjectValidationDescriptor<string, typeof input> = jest.fn((input) => errorList)
      const result = validate(
        input,
        validator
      )
      expect(validator).toBeCalledWith(input)
      expect(result).toBe(errorList)
    })
    it("can be deep validated", () => {
      const errorList = [['error 1'], ['error 2']]
      const input = {
        test1: 1,
        test2: [],
        test3: {
          test4: {}
        }
      }
      const validationFn1 = jest.fn(function validation<V>(val: V) { return errorList[0] })
      const validationFn2 = jest.fn(function validation<V>(val: V) { return errorList[1] })
      const validator: ObjectValidationDescriptor<string, typeof input> = {
        test2: validationFn1,
        test3: {
          test4: validationFn2
        }
      }
      const result = validate(
        input,
        validator
      )
      expect(validationFn1).toBeCalledWith(input.test2)
      expect(validationFn2).toBeCalledWith(input.test3.test4)
      expect(result).toMatchObject({
        test2: errorList[0],
        test3: {
          test4: errorList[1]
        }
      })
    })
  })
})

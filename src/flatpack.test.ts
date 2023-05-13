import { flatpack } from "./flatpack"
import { ObjectValidationResult } from "./types"

describe("flatpack", () => {
  describe("non-objects", () => {
    it("should be robust and return an empty list", () => {
      const options = { root: "path" }
      const flatlist = flatpack('string' as any, options)
      expect(flatlist.length).toStrictEqual(0)
    })
  })
  describe("array", () => {
    it("should return list containing results", () => {
      const validationResult: ObjectValidationResult<string, number> = ['error 1']
      const options = { root: "path" }
      const flatlist = flatpack(validationResult, options)
      expect(flatlist).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: options.root,
            data: validationResult
          })
        ])
      )
    })
  })
  describe("object", () => {
    it("should return list containing results", () => {
      const errorList = [
        ['e1', 'e2'],
        ['e2', 'e3'],
        ['e3', 'e4'],
      ]
      type InputValue = {
        test1: {},
        test2: {
          test3: number,
          test4: number
        },
        test5: {
          test6: number,
          test7: number
        },
        test8: number
      }
      const validationResult: ObjectValidationResult<string, InputValue> = {
        test1: [] as string[],
        test2: {
          test3: [] as string[],
          test4: errorList[0]
        },
        test8: errorList[1]
      }
      const options = { root: "path" }
      const flatlist = flatpack<string, InputValue>(validationResult, options)
      expect(flatlist).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: `${options.root}.test2.test4`,
            data: errorList[0]
          }),
          expect.objectContaining({
            path: `${options.root}.test8`,
            data: errorList[1]
          })
        ])
      )
    })
  })
})

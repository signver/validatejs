import { objectValidate } from "./object-validate";

describe("objectValidate", () => {
  it("should return empty", () => {
    const value = {};
    const validations = {};
    const result = objectValidate(value, validations);
    expect(Object.entries(result).length).toBe(0);
  });
  it("should call validation functions", () => {
    const value = {
      stringValue1: "a",
      numberValue1: 0,
    };
    const validations = {
      stringValue1: (x: any) => [],
      numberValue1: (x: any) => [],
    };
    const spies = Object.keys(validations).map((key) => {
      return {
        key,
        spy: jest.spyOn(validations, key as keyof typeof validations),
      };
    });
    objectValidate(value, validations);
    spies.forEach(({ key, spy }) => {
      expect(spy).toBeCalledWith(value[key as keyof typeof value]);
    });
  });
  it("should omit keys without error(s)", () => {
    const tooShortError = "too short";
    const invalidFormatError = "invalid format";
    const tooSmallError = "too small";
    const isZeroError = "cannot be zero";
    const validateString = (x: string) => {
      const result = [];
      if (x.length < 2) {
        result.push(tooShortError);
      }
      if (x.startsWith("aa")) {
        result.push(invalidFormatError);
      }
      return result;
    };
    const validateNumber = (x: number) => {
      const result = [];
      if (x < 2) {
        result.push(tooSmallError);
      }
      if (x === 0) {
        result.push(isZeroError);
      }
      return result;
    };
    const value = {
      stringValue1: "a",
      stringValue2: "aa",
      stringValue3: "aba",
      numberValue1: 0,
      numberValue2: 1,
      numberValue3: 2,
    };
    const validations = {
      stringValue1: validateString,
      stringValue2: validateString,
      stringValue3: validateString,
      numberValue1: validateNumber,
      numberValue2: validateNumber,
      numberValue3: validateNumber,
    };
    const validationResult = {
      stringValue1: [tooShortError],
      stringValue2: [invalidFormatError],
      numberValue1: [tooSmallError, isZeroError],
      numberValue2: [tooSmallError],
    };
    const result = objectValidate(value, validations);
    expect(result).toMatchObject(validationResult);
  });
});

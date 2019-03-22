import {
  reverseString,
  addOne,
  cleanNulls,
  sliceFraction,
  checkEmptyFraction,
  formatValue,
  formatPercent,
  validateFraction,
  formatCurrencyValue,
  roundPercents,
  formatValueDifferentDecimalScale
} from "./formatter";

describe("test formatter functions", () => {
  describe("test reverseString", () => {
    it("should be reverse strings", () => {
      expect(reverseString("qwerty")).toBe("ytrewq");
      expect(reverseString(123456789)).toBe("987654321");
    });
  });
  describe("test addOne", () => {
    it("should be add one to fraction if fraction contain only zeros", () => {
      expect(addOne(["0", "0000"])).toEqual(["0", "0001"]);
      expect(addOne(["0", "0001"])).toEqual(["0", "0001"]);
      expect(addOne(["0"])).toEqual(["0"]);
      expect(addOne(["1"])).toEqual(["1"]);
      expect(addOne(["1", "00000000000"])).toEqual(["1", "00000000001"]);
      expect(addOne(["1", "123"])).toEqual(["1", "123"]);
    });
  });
  describe("test cleanNulls", () => {
    it("should be ", () => {
      expect(cleanNulls(["0", "0001"])).toEqual(["0", "0001"]);
      expect(cleanNulls(["0", "000100"])).toEqual(["0", "0001"]);
      expect(cleanNulls(["0", "12300"])).toEqual(["0", "123"]);
      expect(cleanNulls(["123", "0"])).toEqual(["123", "0"]);
    });
  });
});

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
  describe("test sliceFraction", () => {
    it("should be ", () => {
      expect(sliceFraction(0)(["0", "0001"])).toEqual(["0"]);
      expect(sliceFraction(0)(["10", "0001"])).toEqual(["10"]);
      expect(sliceFraction(0)(["10"])).toEqual(["10"]);
      expect(sliceFraction(1)(["10", "0001"])).toEqual(["10", "0"]);
      expect(sliceFraction(1)(["10", "1"])).toEqual(["10", "1"]);
      expect(sliceFraction(2)(["10", "11111"])).toEqual(["10", "11"]);
      expect(sliceFraction(4)(["10", "11111"])).toEqual(["10", "1111"]);
    });
  });
  describe("test checkEmptyFraction", () => {
    it("should be ", () => {
      expect(checkEmptyFraction(["0", "0001"])).toEqual("0.0001");
      expect(checkEmptyFraction(["100"])).toEqual("100");
      expect(checkEmptyFraction(["100", "100"])).toEqual("100.100");
    });
  });
  describe("test formatValue", () => {
    it("should be round number by internal conditions", () => {
      expect(formatValue(1.000000001)).toEqual("1.00000001");

      expect(formatValue(1.123456789)).toEqual("1.12345678");
      expect(formatValue(11.123456789)).toEqual("11.123456");
      expect(formatValue(101.999999999)).toEqual("101.9999");
      expect(formatValue(1001.999999999)).toEqual("1001.99");

      expect(formatValue(1.0000000001)).toEqual("1.00000001");
      expect(formatValue(11.0000000001)).toEqual("11.000001");
      expect(formatValue(101.00001)).toEqual("101.0001");
      expect(formatValue(1001.00001)).toEqual("1001.01");

      expect(formatValue(1001.0)).toEqual("1001");
      expect(formatValue(1001.0)).toEqual("1001");
    });
    it("should be round number by external conditions", () => {
      expect(formatValue(1.123456789, 3)).toEqual("1.123");
      expect(formatValue(11.123456789, 3)).toEqual("11.123");
      expect(formatValue(101.999999999, 3)).toEqual("101.999");
      expect(formatValue(1001.999999999, 3)).toEqual("1001.999");

      expect(formatValue(1.0000000001, 3)).toEqual("1.001");
      expect(formatValue(11.0000000001, 3)).toEqual("11.001");
      expect(formatValue(101.00001, 3)).toEqual("101.001");
      expect(formatValue(1001.00001, 3)).toEqual("1001.001");

      expect(formatValue(0.119, 2)).toEqual("0.11");
    });
  });
  describe("test formatPercent", () => {
    it("should be ", () => {
      expect(formatPercent(0.01)).toBe("0");
      expect(formatPercent(-0.01)).toBe("0");

      expect(formatPercent(2.1234567)).toBe("2");
      expect(formatPercent(0.1234567)).toBe("0.1");
    });
  });
  describe("test validateFraction", () => {
    it("should be ", () => {
      expect(validateFraction("0.01", "BTC")).toBe(true);
      expect(validateFraction("0.00000001", "BTC")).toBe(true);
      expect(validateFraction("0.000000001", "BTC")).toBe(false);
      expect(validateFraction("0.01", "ETH")).toBe(true);
      expect(validateFraction("0.00000001", "ETH")).toBe(true);
      expect(validateFraction("0.000000001", "ETH")).toBe(false);

      expect(validateFraction("0.01", "GVT")).toBe(true);
      expect(validateFraction("0.0001", "GVT")).toBe(true);
      expect(validateFraction("0.00000001", "GVT")).toBe(false);

      expect(validateFraction("0.01", "USD")).toBe(true);
      expect(validateFraction("0.0001", "USD")).toBe(false);
      expect(validateFraction("0.00000001", "USD")).toBe(false);
    });
  });
});

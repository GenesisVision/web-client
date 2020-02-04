import {
  addOne,
  checkEmptyFraction,
  cleanNulls,
  formatCurrencyValue,
  formatPercent,
  formatValue,
  formatValueDifferentDecimalScale,
  formatValueWithMin,
  reverseString,
  roundPercents,
  sliceFraction,
  validateFraction
} from "utils/formatter";

describe("test formatter functions", () => {
  describe("test formatValueWithMin", () => {
    it("should be format Value", () => {
      expect(formatValueWithMin(1.000000001)).toBe("1.00000001");

      expect(formatValueWithMin(1.123456789)).toBe("1.12345678");
      expect(formatValueWithMin(11.123456789)).toBe("11.12345678");
      expect(formatValueWithMin(101.999999999)).toBe("101.99999999");
      expect(formatValueWithMin(1001.999999999)).toBe("1001.99999999");

      expect(formatValueWithMin(1.0000000001)).toBe("1.00000001");
      expect(formatValueWithMin(11.0000000001)).toBe("11.00000001");
      expect(formatValueWithMin(101.00001)).toBe("101.00001");
      expect(formatValueWithMin(1001.00001)).toBe("1001.00001");

      expect(formatValueWithMin(1001.0)).toBe("1001");
      expect(formatValueWithMin(1001.0)).toBe("1001");
    });
    it("should be show min value", () => {
      expect(formatValueWithMin(0.000000001)).toBe("<0.00000001");
      expect(formatValueWithMin(0.00000000001, 9)).toBe("<0.000000001");
      expect(formatValueWithMin(0.000000001, 7)).toBe("<0.0000001");
      expect(formatValueWithMin(0.000000001, 6)).toBe("<0.000001");
      expect(formatValueWithMin(0.000000001, 5)).toBe("<0.00001");
      expect(formatValueWithMin(0.000000001, 4)).toBe("<0.0001");
      expect(formatValueWithMin(0.000000001, 3)).toBe("<0.001");
      expect(formatValueWithMin(0.000000001, 2)).toBe("<0.01");
      expect(formatValueWithMin(0.000000001, 1)).toBe("<0.1");
      expect(formatValueWithMin(-0.000000001)).toBe("<0.00000001");
      expect(formatValueWithMin(-0.00000000001, 9)).toBe("<0.000000001");
      expect(formatValueWithMin(-0.000000001, 7)).toBe("<0.0000001");
      expect(formatValueWithMin(-0.000000001, 6)).toBe("<0.000001");
      expect(formatValueWithMin(-0.000000001, 5)).toBe("<0.00001");
      expect(formatValueWithMin(-0.000000001, 4)).toBe("<0.0001");
      expect(formatValueWithMin(-0.000000001, 3)).toBe("<0.001");
      expect(formatValueWithMin(-0.000000001, 2)).toBe("<0.01");
      expect(formatValueWithMin(-0.000000001, 1)).toBe("<0.1");
      const value = -0.001;
      expect(formatValueWithMin(value)).toBe(String(value));
    });
  });
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
    it("should be deleted nulls in end of fraction", () => {
      expect(cleanNulls(["0", "0001"])).toEqual(["0", "0001"]);
      expect(cleanNulls(["0", "000100"])).toEqual(["0", "0001"]);
      expect(cleanNulls(["0", "12300"])).toEqual(["0", "123"]);
      expect(cleanNulls(["123", "0"])).toEqual(["123", "0"]);
    });
  });
  describe("test sliceFraction", () => {
    it("should be slice fraction to the amount specified in the param", () => {
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
    it("should be remove fraction if it is empty", () => {
      expect(checkEmptyFraction(["0", "0001"])).toBe("0.0001");
      expect(checkEmptyFraction(["100", "100"])).toBe("100.100");
      expect(checkEmptyFraction(["100"])).toBe("100");
      expect(checkEmptyFraction(["0"])).toBe("0");
      expect(checkEmptyFraction(["-100"])).toBe("-100");
    });
  });
  describe("test formatValue", () => {
    it("should be round number by internal conditions", () => {
      expect(formatValue(1.000000001)).toBe("1.00000001");

      expect(formatValue(1.123456789)).toBe("1.12345678");
      expect(formatValue(11.123456789)).toBe("11.123456");
      expect(formatValue(101.999999999)).toBe("101.9999");
      expect(formatValue(1001.999999999)).toBe("1001.99");

      expect(formatValue(1.0000000001)).toBe("1.00000001");
      expect(formatValue(11.0000000001)).toBe("11.000001");
      expect(formatValue(101.00001)).toBe("101.0001");
      expect(formatValue(1001.00001)).toBe("1001.01");

      expect(formatValue(1001.0)).toBe("1001");
      expect(formatValue(1001.0)).toBe("1001");
    });
    it("should be round number by external conditions", () => {
      expect(formatValue(1.123456789, 3)).toBe("1.123");
      expect(formatValue(-1.123456789, 3, true)).toBe("1.123");
      expect(formatValue(11.123456789, 3)).toBe("11.123");
      expect(formatValue(-11.123456789, 3, true)).toBe("11.123");
      expect(formatValue(101.999999999, 3)).toBe("101.999");
      expect(formatValue(-101.999999999, 3, true)).toBe("101.999");
      expect(formatValue(1001.999999999, 3)).toBe("1001.999");
      expect(formatValue(-1001.999999999, 3, true)).toBe("1001.999");

      expect(formatValue(1.0000000001, 3)).toBe("1.001");
      expect(formatValue(11.0000000001, 3)).toBe("11.001");
      expect(formatValue(101.00001, 3)).toBe("101.001");
      expect(formatValue(1001.00001, 3)).toBe("1001.001");

      expect(formatValue(0.119, 2)).toBe("0.11");
    });
  });
  describe("test formatPercent", () => {
    it("should be return '0' if value <0.01 and >-0.01, and delete fraction of value >1", () => {
      expect(formatPercent(0.01)).toBe("0");
      expect(formatPercent(-0.01)).toBe("0");

      expect(formatPercent(2.1234567)).toBe("2");
      expect(formatPercent(0.1234567)).toBe("0.1");
    });
  });
  describe("test validateFraction", () => {
    it("should be return true if fraction less currency length", () => {
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
  describe("test formatCurrencyValue", () => {
    it("should be formatting value fraction to currency length", () => {
      expect(formatCurrencyValue(1.00000000001, "ETH")).toBe("1.00000001");
      expect(formatCurrencyValue(1.00000000001, "BTC")).toBe("1.00000001");
      expect(formatCurrencyValue(1.00000000001, "GVT")).toBe("1.0001");
      expect(formatCurrencyValue(1.00000000001, "USD")).toBe("1.01");
    });
  });
  describe("test roundPercents", () => {
    it("should be rounding percent to 0.01 values", () => {
      expect(roundPercents(0)).toBe("0%");
      expect(roundPercents(0.001)).toBe("<0.01%");
      expect(roundPercents(-0.001)).toBe("0.01%"); // TODO Why?..
      expect(roundPercents(0.009)).toBe("<0.01%");
      expect(roundPercents(0.1)).toBe("0.1%");
      expect(roundPercents(1)).toBe("1%");
      expect(roundPercents(-1)).toBe("1%"); // TODO Why?..
    });
  });
  describe("test formatValueDifferentDecimalScale", () => {
    it("should be round number to decimalScaleSmallValue if value >1 or <-1, and round number to decimalScaleBigValue in other cases", () => {
      expect(formatValueDifferentDecimalScale(0.0000000000001, 6, 2)).toBe(
        "0.000001"
      );
      expect(formatValueDifferentDecimalScale(1.0000000000001, 6, 2)).toBe(
        "1.01"
      );
      expect(formatValueDifferentDecimalScale(0.0000000000001, 8, 1)).toBe(
        "0.00000001"
      );
      expect(formatValueDifferentDecimalScale(1.0000000000001, 8, 1)).toBe(
        "1.1"
      );
      expect(formatValueDifferentDecimalScale(1, 8, 1)).toBe("1");
    });
  });
});

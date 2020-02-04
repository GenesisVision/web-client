import {
  calculatePercentage,
  checkCurrencyValue,
  convertFromCurrency,
  convertToCurrency,
  CURRENCY_FRACTIONS
} from "./currency-converter";

require("jasmine-check").install();

declare const check: any;
declare const gen: any;

describe("test currency converter functions", () => {
  describe("test convertFromCurrency", () => {
    check.it(
      "should be convert number with rate",
      gen.number,
      gen.number,
      (x: number, y: number) => {
        expect(typeof convertFromCurrency(x, y)).toBe("number");
        expect(convertFromCurrency(x, y)).toBe(x * y);
      }
    );
  });
  describe("test convertToCurrency", () => {
    check.it(
      "should be convert number with rate",
      gen.number,
      gen.number,
      (x: number, y: number) => {
        expect(typeof convertToCurrency(x, y)).toBe("number");
        expect(convertToCurrency(x, y)).toBe(x / y);
      }
    );
  });
  describe("test calculatePercentage", () => {
    check.it(
      "should be calculate percentage by (x * y) / 100",
      gen.number,
      gen.number,
      (x: number, y: number) => {
        expect(typeof calculatePercentage(x, y)).toBe("number");
        expect(calculatePercentage(x, y)).toBe((x * y) / 100);
      }
    );
  });
  describe("test CURRENCY_FRACTIONS", () => {
    it("should be return fraction length to any currency", () => {
      expect(CURRENCY_FRACTIONS("ETH")).toBe(8);
      expect(CURRENCY_FRACTIONS("BTC")).toBe(8);
      expect(CURRENCY_FRACTIONS("GVT")).toBe(4);
      expect(CURRENCY_FRACTIONS("RUB")).toBe(4);
      expect(CURRENCY_FRACTIONS("USDT")).toBe(4);
      expect(CURRENCY_FRACTIONS("USD")).toBe(2);
      expect(CURRENCY_FRACTIONS("EUR")).toBe(2);
    });
  });
  describe("test checkCurrencyValue", () => {
    it("should be check equality of number fraction and currency fraction value", () => {
      expect(checkCurrencyValue(0.000000009, "ETH")).toBe(0);
      expect(checkCurrencyValue(0.00000001, "ETH")).toBe(0.00000001);
      expect(checkCurrencyValue(0.000000009, "BTC")).toBe(0);
      expect(checkCurrencyValue(0.00000001, "BTC")).toBe(0.00000001);

      expect(checkCurrencyValue(0.00009, "GVT")).toBe(0);
      expect(checkCurrencyValue(0.0001, "GVT")).toBe(0.0001);

      expect(checkCurrencyValue(0.009, "USD")).toBe(0);
      expect(checkCurrencyValue(0.01, "USD")).toBe(0.01);
    });
  });
});

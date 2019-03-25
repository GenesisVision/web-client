import { allowValuesNumberFormat, convertToArray } from "./helpers";

require("jasmine-check").install();
declare const check: any;
declare const gen: any;

describe("test helpers functions", () => {
  describe("test allowValuesNumberFormat", () => {
    it("should be ", () => {
      const allows = {
        from: 1,
        to: 5
      };
      expect(
        allowValuesNumberFormat(allows)({ floatValue: 2, formattedValue: "2" })
      ).toBe(true);
      expect(
        allowValuesNumberFormat(allows)({ floatValue: 6, formattedValue: "6" })
      ).toBe(false);
      expect(
        allowValuesNumberFormat(allows)({ floatValue: 6, formattedValue: "6" })
      ).toBe(false);
      expect(
        allowValuesNumberFormat(allows)({ floatValue: 0, formattedValue: "" })
      ).toBe(true);
      expect(
        allowValuesNumberFormat(allows)({ floatValue: 0, formattedValue: "0." })
      ).toBe(true);
    });
  });
  describe("test convertToArray", () => {
    check.it("should be ", gen.number, (x: number) => {
      expect(convertToArray(x)).toEqual([x]);
    });
    check.it("should be ", gen.string, (x: string) => {
      expect(convertToArray(x)).toEqual([x]);
    });
    it("should be ", () => {
      const array = [1, 2, 3, 4];
      expect(convertToArray(array)).toBe(array);
    });
  });
});

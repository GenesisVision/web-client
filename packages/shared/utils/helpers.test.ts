import { allowValuesNumberFormat, convertToArray } from "./helpers";

require("jasmine-check").install();
declare const check: any;
declare const gen: any;

xdescribe("test helpers functions", () => {
  describe("test allowValuesNumberFormat", () => {
    it("should be return true if number inside diapason and not equal '' and '0.'", () => {
      const allows = {
        from: 1,
        to: 5
      };
      expect(
        allowValuesNumberFormat(allows)({
          value: "0",
          floatValue: 2,
          formattedValue: "2"
        })
      ).toBe(true);
      expect(
        allowValuesNumberFormat(allows)({
          value: "0",
          floatValue: 6,
          formattedValue: "6"
        })
      ).toBe(false);
      expect(
        allowValuesNumberFormat(allows)({
          value: "0",
          floatValue: 6,
          formattedValue: "6"
        })
      ).toBe(false);
      expect(
        allowValuesNumberFormat(allows)({
          value: "0",
          floatValue: 0,
          formattedValue: ""
        })
      ).toBe(true);
      expect(
        allowValuesNumberFormat(allows)({
          value: "0",
          floatValue: 0,
          formattedValue: "0."
        })
      ).toBe(true);
    });
  });
  describe("test convertToArray", () => {
    check.it(
      "should be convert to array numbers",
      gen.number,
      (value: number) => {
        expect(convertToArray(value)).toEqual([value]);
      }
    );
    check.it("should be convert to strings ", gen.string, (value: string) => {
      expect(convertToArray(value)).toEqual([value]);
    });
    check.it(
      "should be return array",
      gen.array(gen.string),
      (value: string[]) => {
        expect(convertToArray(value)).toEqual(value);
      }
    );
  });
});

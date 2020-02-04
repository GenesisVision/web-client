import {
  allowValuesNumberFormat,
  convertToArray,
  getArrayType,
  getType,
  merge,
  mergeArrays,
  mergeObjects
} from "utils/helpers";

require("jasmine-check").install();

declare const check: any;
declare const gen: any;

describe("test helpers functions", () => {
  describe("test getType", () => {
    it("should be return types of values", () => {
      expect(getType(1)).toBe("number");
      expect(getType("1")).toBe("string");
      expect(getType({})).toBe("object");
      expect(getType(() => {})).toBe("function");
      expect(getType([])).toBe("array");
      expect(getType(null)).toBe("object");
      expect(getType(undefined)).toBe("undefined");
      expect(getType(true)).toBe("boolean");
    });
  });
  describe("test getType", () => {
    it("should be return types of arrays", () => {
      expect(getArrayType([1, 1, 1, 1])).toBe("number");
      expect(getArrayType(["1", "1", "1", "1"])).toBe("string");
      expect(getArrayType([{}, {}, {}, {}])).toBe("object");
      expect(getArrayType([() => {}, () => {}, () => {}, () => {}])).toBe(
        "function"
      );
      expect(getArrayType([[], [], [], []])).toBe("array");
      expect(getArrayType([null, null, null, null])).toBe("object");
      expect(getArrayType([undefined, undefined, undefined, undefined])).toBe(
        "undefined"
      );
      expect(getArrayType([true, true, true, true])).toBe("boolean");
    });
    it("should be return null if arrays is not uniform", () => {
      expect(getArrayType([1, 1, null, 1])).toBe(null);
      expect(getArrayType(["1", "1", 1, "1"])).toBe(null);
      expect(getArrayType([{}, {}, [], {}])).toBe(null);
      expect(getArrayType([() => {}, 1, () => {}, () => {}])).toBe(null);
      expect(getArrayType([[], [], {}, []])).toBe(null);
      expect(getArrayType([null, undefined, null, null])).toBe(null);
      expect(getArrayType([undefined, true, undefined, undefined])).toBe(null);
      expect(getArrayType([true, true, () => {}, true])).toBe(null);
    });
  });
  describe("test mergeArrays", () => {
    it("should be merge arrays", () => {
      expect(
        mergeArrays([
          [1, 2, 3],
          [4, 5, 6]
        ])
      ).toEqual([1, 2, 3, 4, 5, 6]);
      expect(
        mergeArrays([
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]
        ])
      ).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(mergeArrays([[1, 2, 3], [], [4, 5, 6]])).toEqual([
        1,
        2,
        3,
        4,
        5,
        6
      ]);
    });
  });
  describe("test mergeObjects", () => {
    it("should be merge Objects", () => {
      expect(
        mergeObjects([{ a: 1, b: 2, c: 3 }, {}, { d: 1, e: 2, f: 3 }])
      ).toEqual({ a: 1, b: 2, c: 3, d: 1, e: 2, f: 3 });
      expect(
        mergeObjects([{ a: 1, b: 2, c: 3 }, { d: 1, e: 2, f: 3 }, { g: 1 }, {}])
      ).toEqual({ a: 1, b: 2, c: 3, d: 1, e: 2, f: 3, g: 1 });
    });
  });
  describe("test merge", () => {
    it("should be merge arrays", () => {
      expect(merge([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
      expect(merge([1, 2], [], [3, 4], [5], [6])).toEqual([1, 2, 3, 4, 5, 6]);
    });
    it("should be merge objects", () => {
      expect(
        merge({ a: 1, b: 2, c: 3 }, { d: 1, e: 2, f: 3 }, { g: 1 }, {})
      ).toEqual({ a: 1, b: 2, c: 3, d: 1, e: 2, f: 3, g: 1 });
      expect(merge({ a: 1, b: 2, c: 3 }, {}, { d: 1, e: 2, f: 3 })).toEqual({
        a: 1,
        b: 2,
        c: 3,
        d: 1,
        e: 2,
        f: 3
      });
    });
    it("should be return first argument if arguments is not uniform", () => {
      expect(
        merge(
          ({ b: 1 } as unknown) as never[],
          ({ d: 1 } as unknown) as never[],
          ({ g: 1 } as unknown) as never[],
          []
        )
      ).toEqual({
        b: 1
      });
    });
  });
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
  xdescribe("test convertToArray", () => {
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

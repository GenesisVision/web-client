import replaceParams from "./replace-params";

require("jasmine-check").install();

declare const check: any;
declare const gen: any;

describe("test helpers functions", () => {
  describe("test allowValuesNumberFormat", () => {
    check.it(
      "should be replace params in query string",
      gen.alphaNumString,
      gen.alphaNumString,
      gen.alphaNumString,
      (x: string, y: string, z: string) => {
        if (x === "" || y === "" || x === " " || y === " " || x.includes(y))
          return;
        expect(replaceParams(`${x}/${y}`, { [y]: z })).toBe(`${x}/${z}`);
      }
    );
  });
});

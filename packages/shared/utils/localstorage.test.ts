import { loadData, saveData } from "./localstorage";

require("jasmine-check").install();

declare const check: any;
declare const gen: any;

xdescribe("test localstorage functions", () => {
  describe("test saveData and loadData", () => {
    check.it(
      "should be save and load string data",
      gen.alphaNumString,
      gen.alphaNumString,
      (key: string, value: string) => {
        if (key === "") return;
        saveData(key, value);
        expect(loadData(key)).toBe(value);
      }
    );
    check.it(
      "should be save and load number data",
      gen.alphaNumString,
      gen.int,
      (key: string, value: number) => {
        if (key === "") return;
        saveData(key, value);
        expect(loadData(key)).toBe(value);
      }
    );
    check.it(
      "should be save and load boolean data",
      gen.alphaNumString,
      gen.boolean,
      (key: string, value: number) => {
        if (key === "") return;
        saveData(key, value);
        expect(loadData(key)).toBe(value);
      }
    );
    check.it(
      "should be save and load object data",
      gen.alphaNumString,
      gen.object(gen.alphaNumString),
      (key: string, value: number) => {
        if (key === "") return;
        saveData(key, value);
        expect(loadData(key)).toEqual(value);
      }
    );
  });
});

import { getCookie, setCookie } from "./cookie";

jest.mock("./cookie", () => {
  const store: { [k: string]: string } = {};
  return {
    getCookie: (name: string) => store[name],
    setCookie: (name: string, value: string) => {
      store[name] = value;
    }
  };
});

require("jasmine-check").install();

declare const check: any;
declare const gen: any;

describe("test cookie functions", () => {
  describe("test setCookie and getCookie", () => {
    check.it(
      "should be save and load string data",
      gen.alphaNumString,
      gen.alphaNumString,
      (key: string, value: string) => {
        if (key === "") return;
        setCookie(key, value);
        expect(getCookie(key)).toBe(value);
      }
    );
  });
});

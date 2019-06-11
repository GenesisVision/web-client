import { apiSelector } from "./selector";

describe("test selectors", () => {
  describe("test apiSelector", () => {
    it("should be memoize object", () => {
      const data = { a: 1 };
      const data2 = { a: 1 };
      const data3 = { a: 1 };
      const object = {
        isPending: false,
        errorMessage: "",
        code: null,
        data: data
      };
      const object2 = {
        isPending: false,
        errorMessage: "",
        code: null,
        data: data2
      };
      const object3 = {
        isPending: false,
        errorMessage: "",
        code: null,
        data: data3
      };
      const selector = apiSelector();
      expect(selector(object)).toBe(data);
      expect(selector(object2)).toBe(data);
      expect(selector(object3)).toBe(data);
    });
  });
});

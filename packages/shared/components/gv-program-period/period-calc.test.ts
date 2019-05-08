import { calcPercent } from ".";

describe("Period calcs tests", () => {
  describe("number format", () => {
    test("general calculation", () => {
      const start = 0,
        end = 100,
        value = 42;
      expect(calcPercent(value, start, end)).toBe(42);
    });

    test("value is more than end", () => {
      const start = 0,
        end = 100,
        value = 101;
      expect(calcPercent(value, start, end)).toBe(100);
    });

    test("value is less than start", () => {
      const start = 0,
        end = 100,
        value = -1;
      expect(calcPercent(value, start, end)).toBe(0);
    });
  });

  describe("date format", () => {
    test("general calculation", () => {
      const start = new Date("2018-01-01"),
        end = new Date("2018-01-11"),
        value = new Date("2018-01-04");
      expect(calcPercent(value, start, end)).toBe(30);
    });

    test("value is more than end", () => {
      const start = new Date("2018-01-01"),
        end = new Date("2018-01-11"),
        value = new Date("2018-01-12");
      expect(calcPercent(value, start, end)).toBe(100);
    });

    test("value is less than start", () => {
      const start = new Date("2018-01-02"),
        end = new Date("2018-01-11"),
        value = new Date("2018-01-01");
      expect(calcPercent(value, start, end)).toBe(0);
    });
  });
});

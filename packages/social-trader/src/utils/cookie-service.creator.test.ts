import {
  CookieProvider,
  cookieServiceCreator,
  CookieServiceDefaultEmptyParseState,
  CookieServiceDefaultEmptyState
} from "utils/cookie-service.creator";

class MockCookieProvider implements CookieProvider {
  private values = new Map();

  getCookie(key: string): string | undefined {
    const value = this.values.get(key);
    return value ? String(this.values.get(key)) : value;
  }

  setCookie(key: string, value: any) {
    this.values.set(key, value);
  }

  removeCookie(key: string) {
    this.values.delete(key);
  }
}

require("jasmine-check").install();

declare const check: any;
declare const gen: any;

const TEST_KEY = "TEST_KEY";

describe("test cookie service", () => {
  const mockCookieProvider: CookieProvider = new MockCookieProvider();
  describe("test init", () => {
    const cookieService = cookieServiceCreator({
      cookieProvider: new MockCookieProvider(),
      key: TEST_KEY
    });
    it("should create cookie service methods", () => {
      expect(cookieService.clear).toBeDefined();
      expect(cookieService.get).toBeDefined();
      expect(cookieService.set).toBeDefined();
    });
  });
  describe("test set method", () => {
    const mockCookieProvider = new MockCookieProvider();
    describe("should set primitive values", () => {
      const cookieService = cookieServiceCreator({
        cookieProvider: mockCookieProvider,
        key: TEST_KEY
      });
      check.it("should set string data", gen.string, (value: string) => {
        cookieService.set(value);
        expect(mockCookieProvider.getCookie(TEST_KEY)).toBe(value);
      });
      check.it("should set number data", gen.number, (value: string) => {
        cookieService.set(value);
        const savedData = String(value);
        expect(mockCookieProvider.getCookie(TEST_KEY)).toBe(savedData);
      });
      check.it("should set boolean data", gen.boolean, (value: string) => {
        cookieService.set(value);
        const savedData = String(value);
        expect(mockCookieProvider.getCookie(TEST_KEY)).toBe(savedData);
      });
    });
    describe("should set non-primitive values", () => {
      describe("should set array values", () => {
        const cookieService = cookieServiceCreator<any[]>({
          parse: true,
          cookieProvider: mockCookieProvider,
          key: TEST_KEY
        });
        check.it(
          "should set number array data",
          gen.array(gen.int),
          (value: number[]) => {
            cookieService.set(value);
            const savedData = JSON.stringify(value);
            expect(mockCookieProvider.getCookie(TEST_KEY)).toBe(savedData);
          }
        );
        check.it(
          "should set string array data",
          gen.array(gen.string),
          (value: string[]) => {
            cookieService.set(value);
            const savedData = JSON.stringify(value);
            expect(mockCookieProvider.getCookie(TEST_KEY)).toBe(savedData);
          }
        );
        check.it(
          "should set boolean array data",
          gen.array(gen.boolean),
          (value: string[]) => {
            cookieService.set(value);
            const savedData = JSON.stringify(value);
            expect(mockCookieProvider.getCookie(TEST_KEY)).toBe(savedData);
          }
        );
      });
      describe("should set object values", () => {
        const cookieService = cookieServiceCreator<Object>({
          parse: true,
          cookieProvider: mockCookieProvider,
          key: TEST_KEY
        });
        check.it(
          "should set number object data",
          gen.object(gen.int),
          (value: Object) => {
            cookieService.set(value);
            const savedData = JSON.stringify(value);
            expect(mockCookieProvider.getCookie(TEST_KEY)).toBe(savedData);
          }
        );
        check.it(
          "should set string array data",
          gen.object(gen.string),
          (value: Object) => {
            cookieService.set(value);
            const savedData = JSON.stringify(value);
            expect(mockCookieProvider.getCookie(TEST_KEY)).toBe(savedData);
          }
        );
        check.it(
          "should set boolean array data",
          gen.object(gen.boolean),
          (value: Object) => {
            cookieService.set(value);
            const savedData = JSON.stringify(value);
            expect(mockCookieProvider.getCookie(TEST_KEY)).toBe(savedData);
          }
        );
      });
    });
  });
  describe("test set+get method", () => {
    describe("should set+get primitive values", () => {
      const cookieService = cookieServiceCreator({
        cookieProvider: new MockCookieProvider(),
        key: TEST_KEY
      });
      check.it("should set+get string data", gen.string, (value: string) => {
        cookieService.set(value);
        const cookieValue = cookieService.get();
        expect(cookieValue).toBe(String(value));
      });
      check.it("should set+get number data", gen.number, (value: string) => {
        cookieService.set(value);
        const cookieValue = cookieService.get();
        expect(cookieValue).toBe(String(value));
      });
      check.it("should set+get boolean data", gen.boolean, (value: string) => {
        cookieService.set(value);
        const cookieValue = cookieService.get();
        expect(cookieValue).toBe(String(value));
      });
    });
    describe("should set+get non-primitive values", () => {
      describe("should set+get array values", () => {
        const cookieService = cookieServiceCreator<any[]>({
          parse: true,
          cookieProvider: new MockCookieProvider(),
          key: TEST_KEY
        });
        check.it(
          "should set+get number array data",
          gen.array(gen.int),
          (value: number[]) => {
            cookieService.set(value);
            const cookieValue = cookieService.get();
            expect(cookieValue).toEqual(value);
          }
        );
        check.it(
          "should set+get string array data",
          gen.array(gen.string),
          (value: string[]) => {
            cookieService.set(value);
            const cookieValue = cookieService.get();
            expect(cookieValue).toEqual(value);
          }
        );
        check.it(
          "should set+get boolean array data",
          gen.array(gen.boolean),
          (value: string[]) => {
            cookieService.set(value);
            const cookieValue = cookieService.get();
            expect(cookieValue).toEqual(value);
          }
        );
      });
      describe("should set+get object values", () => {
        const cookieService = cookieServiceCreator<Object>({
          parse: true,
          cookieProvider: new MockCookieProvider(),
          key: TEST_KEY
        });
        check.it(
          "should set+get number object data",
          gen.object(gen.int),
          (value: Object) => {
            cookieService.set(value);
            const cookieValue = cookieService.get();
            expect(cookieValue).toEqual(value);
          }
        );
        check.it(
          "should set+get string array data",
          gen.object(gen.string),
          (value: Object) => {
            cookieService.set(value);
            const cookieValue = cookieService.get();
            expect(cookieValue).toEqual(value);
          }
        );
        check.it(
          "should set+get boolean array data",
          gen.object(gen.boolean),
          (value: Object) => {
            cookieService.set(value);
            const cookieValue = cookieService.get();
            expect(cookieValue).toEqual(value);
          }
        );
      });
    });
  });
  describe("test clear method and initial state", () => {
    describe("test primitive default initial state", () => {
      const cookieService = cookieServiceCreator({
        cookieProvider: new MockCookieProvider(),
        key: TEST_KEY
      });
      it("should have primitive initial state", () => {
        const initValue = cookieService.get();
        expect(initValue).toBe(CookieServiceDefaultEmptyState);
      });
      check.it(
        "should return primitive initial state after clear",
        gen.string,
        (value: string) => {
          cookieService.set(value);
          cookieService.clear();
          const valueAfterClear = cookieService.get();
          expect(valueAfterClear).toBe(CookieServiceDefaultEmptyState);
        }
      );
    });
    describe("test non-primitive default initial state", () => {
      const cookieService = cookieServiceCreator({
        parse: true,
        cookieProvider: new MockCookieProvider(),
        key: TEST_KEY
      });
      it("should have non-primitive initial state", () => {
        const initValue = cookieService.get();
        expect(initValue).toEqual(CookieServiceDefaultEmptyParseState);
      });
      check.it(
        "should return non-primitive initial state after clear",
        gen.object(gen.string),
        (value: string) => {
          cookieService.set(value);
          cookieService.clear();
          const valueAfterClear = cookieService.get();
          expect(valueAfterClear).toEqual(CookieServiceDefaultEmptyParseState);
        }
      );
    });
    describe("test primitive custom initial state", () => {
      const customInitialState = "customInitialState";
      const cookieService = cookieServiceCreator({
        initialState: customInitialState,
        cookieProvider: new MockCookieProvider(),
        key: TEST_KEY
      });
      it("should have primitive custom initial state", () => {
        const initValue = cookieService.get();
        expect(initValue).toEqual(customInitialState);
      });
      check.it(
        "should return primitive custom initial state after clear",
        gen.string,
        (value: string) => {
          cookieService.set(value);
          cookieService.clear();
          const valueAfterClear = cookieService.get();
          expect(valueAfterClear).toEqual(customInitialState);
        }
      );
    });
    describe("test non-primitive custom initial state", () => {
      const customInitialState = { customInitialState: "customInitialState" };
      const cookieService = cookieServiceCreator<Object>({
        parse: true,
        initialState: customInitialState,
        cookieProvider: new MockCookieProvider(),
        key: TEST_KEY
      });
      it("should have non-primitive custom initial state", () => {
        const initValue = cookieService.get();
        expect(initValue).toEqual(customInitialState);
      });
      check.it(
        "should return non-primitive custom initial state after clear",
        gen.string,
        (value: string) => {
          cookieService.set(value);
          cookieService.clear();
          const valueAfterClear = cookieService.get();
          expect(valueAfterClear).toEqual(customInitialState);
        }
      );
    });
  });
});

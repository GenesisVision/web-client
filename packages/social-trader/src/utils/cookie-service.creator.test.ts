import {
  CookieProvider,
  cookieServiceCreator
} from "utils/cookie-service.creator";

class MockCookieProvider implements CookieProvider {
  private values = new Map();

  getCookie(key: string): string | undefined {
    return String(this.values.get(key));
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
  const cookieService = cookieServiceCreator({
    cookieProvider: mockCookieProvider,
    key: TEST_KEY,
    initialState: ""
  });
  it("should create cookie service methods", () => {
    expect(cookieService.clear).toBeDefined();
    expect(cookieService.get).toBeDefined();
    expect(cookieService.set).toBeDefined();
  });
  describe("should set primitive values", () => {
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
});

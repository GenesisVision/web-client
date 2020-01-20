import { Browser, Page } from "puppeteer";
import { getTokenName } from "utils/get-token-name";
import {
  ASYNC_TEST_TIMEOUT,
  getBrowser,
  useTestHelpers
} from "utils/test-helpers";

describe("Login", () => {
  let page: Page;
  let browser: Browser;
  beforeAll(async () => {
    browser = await getBrowser();
    page = await browser.newPage();
    const { authorize } = useTestHelpers(page);
    await authorize();
  }, ASYNC_TEST_TIMEOUT);
  it("should be log in on login form", async () => {
    const cookies = await page.cookies();
    const tokenName = getTokenName();
    const tokenCookie = cookies.find(cookie => cookie.name === tokenName);
    expect(!!tokenCookie).toBe(true);
  });
  afterAll(() => {
    browser.close();
  });
});

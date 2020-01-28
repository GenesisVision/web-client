import { Browser, Page } from "puppeteer";
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
    const { getAuth } = useTestHelpers(page);
    const tokenCookie = await getAuth();
    expect(!!tokenCookie).toBe(true);
  });
  afterAll(() => {
    browser.close();
  });
});

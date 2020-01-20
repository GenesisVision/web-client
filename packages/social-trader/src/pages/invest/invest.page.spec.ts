import { Browser, Page } from "puppeteer";
import { INVEST_ROUTE } from "routes/invest.routes";
import {
  ASYNC_TEST_TIMEOUT,
  getBrowser,
  testT,
  useTestHelpers
} from "utils/test-helpers";

describe("Invest", () => {
  let page: Page;
  let browser: Browser;
  beforeAll(async () => {
    browser = await getBrowser();
    page = await browser.newPage();
    const { openPage } = useTestHelpers(page);
    await openPage(INVEST_ROUTE);
  }, ASYNC_TEST_TIMEOUT);
  it("should be titled Invest", async () => {
    const title = await page.title();
    expect(title).toContain(testT("invest.title"));
  });
  afterAll(() => {
    browser.close();
  });
});

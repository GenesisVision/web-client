import { Browser, Page } from "puppeteer";
import {
  ASYNC_TEST_TIMEOUT,
  getBrowser,
  testT,
  useTestHelpers
} from "utils/test-helpers";

import { CREATE_FUND_PAGE_ROUTE } from "./create-fund.constants";

describe("Create fund", () => {
  let page: Page;
  let browser: Browser;
  beforeAll(async () => {
    browser = await getBrowser();
    page = await browser.newPage();
    const { openAuthPage } = useTestHelpers(page);
    await openAuthPage(CREATE_FUND_PAGE_ROUTE);
  }, ASYNC_TEST_TIMEOUT);
  it("should be titled Create fund", async () => {
    const title = await page.title();
    expect(title).toContain(testT("create-fund-page:title"));
  });
  afterAll(() => {
    browser.close();
  });
});

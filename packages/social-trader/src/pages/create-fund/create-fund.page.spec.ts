import { Page } from "puppeteer";
import {
  ASYNC_TEST_TIMEOUT,
  getPage,
  openAuthPage,
  testT
} from "utils/test-helpers";

import { CREATE_FUND_PAGE_ROUTE } from "./create-fund.constants";

describe("Create fund", () => {
  let page: Page;
  beforeAll(async () => {
    page = await getPage();
    await openAuthPage({
      page,
      url: CREATE_FUND_PAGE_ROUTE
    });
  }, ASYNC_TEST_TIMEOUT);
  it("should be titled Create fund", async () => {
    const title = await page.title();
    expect(title).toContain(testT("create-fund-page.title"));
  });
});

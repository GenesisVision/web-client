import { Page } from "puppeteer";
import { INVEST_ROUTE } from "routes/invest.routes";
import {
  ASYNC_TEST_TIMEOUT,
  getPage,
  openPage,
  testT
} from "utils/test-helpers";

describe("Invest", () => {
  let page: Page;
  beforeAll(async () => {
    page = await getPage();
    await openPage({
      page,
      url: INVEST_ROUTE
    });
  }, ASYNC_TEST_TIMEOUT);
  it("should be titled Invest", async () => {
    const title = await page.title();
    expect(title).toContain(testT("invest.title"));
  });
});

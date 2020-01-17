import { Page } from "puppeteer";
import { getTokenName } from "utils/get-token-name";
import { ASYNC_TEST_TIMEOUT, authorize, getPage } from "utils/test-helpers";

describe("Login", () => {
  let page: Page;
  beforeAll(async () => {
    page = await getPage();
    await authorize({
      page
    });
  }, ASYNC_TEST_TIMEOUT);
  it("should be log in on login form", async () => {
    const cookies = await page.cookies();
    const tokenName = getTokenName();
    const tokenCookie = cookies.find(cookie => cookie.name === tokenName);
    expect(!!tokenCookie).toBe(true);
  });
});

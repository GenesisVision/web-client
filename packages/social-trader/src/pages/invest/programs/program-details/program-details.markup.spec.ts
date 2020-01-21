import { Browser, Page } from "puppeteer";
import { PROGRAMS_ROUTE } from "routes/programs.routes";
import {
  ASYNC_TEST_TIMEOUT,
  getBrowser,
  useTestHelpers
} from "utils/test-helpers";

describe("Program details - Page markup", () => {
  const programName = "entryfee0-10-20";
  const url = `${PROGRAMS_ROUTE}/${programName}`;
  let page: Page;
  let browser: Browser;

  beforeAll(async () => {
    browser = await getBrowser();
    page = await browser.newPage();
    const { authorize } = useTestHelpers(page);
    await authorize();
  }, ASYNC_TEST_TIMEOUT);
  beforeEach(async () => {
    const { openPage } = useTestHelpers(page);
    await openPage(url);
  }, ASYNC_TEST_TIMEOUT);
  it("should be titled at program name", async () => {
    const title = await page.title();
    expect(title.toLowerCase()).toContain(programName.toLowerCase());
  });

  afterAll(() => {
    browser.close();
  });
});

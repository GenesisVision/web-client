import {
  activeAssetStatusSelector,
  cancelButtonSelector,
  cancelRequest,
  investingAssetStatusSelector
} from "pages/invest/programs/program-details/program-details.test-helpers";
import { Browser, Page } from "puppeteer";
import { PROGRAMS_ROUTE } from "routes/programs.routes";
import {
  ASYNC_TEST_TIMEOUT,
  DATA_TEST_ATTR,
  getBrowser,
  testT,
  useTestHelpers
} from "utils/test-helpers";

describe("Program details investing", () => {
  const amountValue = "6";
  const investButtonClass = testT("buttons.invest");
  const investButtonSelector = `button[${DATA_TEST_ATTR}=${investButtonClass}]`;
  const investingStatusText = "Investing";
  const statusSelector = investingAssetStatusSelector;
  const programName = "2812-2019";
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
    await cancelRequest(page);
  }, ASYNC_TEST_TIMEOUT);

  it(
    "should be cancel invest request",
    async () => {
      const {
        hasElement,
        openPopup,
        enterAmount,
        submitForm,
        getLastAlertMessage,
        clearAlert,
        safeClick
      } = useTestHelpers(page);
      const successMessage = testT(
        "asset-details:request-line.success-message"
      );
      const status = await hasElement(statusSelector);
      if (!status) {
        await openPopup(investButtonSelector);
        await enterAmount(amountValue);
        await submitForm();

        await clearAlert();
      }
      await safeClick(statusSelector);

      await openPopup(cancelButtonSelector);
      await submitForm();

      const alertMessage = await getLastAlertMessage();
      expect(alertMessage).toBe(successMessage);
    },
    ASYNC_TEST_TIMEOUT
  );

  it(
    "should be open invest popup and invest",
    async () => {
      const {
        waitForSelector,
        waitForLoadBlurLoader,
        openPopup,
        enterAmount,
        submitForm,
        getLastAlertMessage,
        hasElement,
        getTextContent,
        selectWallet
      } = useTestHelpers(page);
      const walletCurrency = "USDT";
      const successMessage = testT(
        `deposit-asset.program.success-alert-message`
      );
      await openPopup(investButtonSelector);
      await waitForLoadBlurLoader(".dialog");

      const subtitle = await hasElement(".dialog__subtitle");
      expect(subtitle).toBeTruthy();
      const subtitleText = await getTextContent(".dialog__subtitle");
      expect((subtitleText || "").toLowerCase()).toBe(
        programName.toLowerCase()
      );

      await selectWallet(walletCurrency);
      await enterAmount(amountValue);
      await submitForm();

      await waitForSelector(activeAssetStatusSelector);

      const alertMessage = await getLastAlertMessage();
      expect(alertMessage).toBe(successMessage);

      const statusText = await getTextContent(statusSelector);
      expect(statusText).toBe(investingStatusText);

      await waitForSelector(investingAssetStatusSelector);
      await cancelRequest(page);
    },
    ASYNC_TEST_TIMEOUT
  );

  afterAll(() => {
    browser.close();
  });
});

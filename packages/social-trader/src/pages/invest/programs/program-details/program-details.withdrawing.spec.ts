import { WITHDRAW_FORM_SUBMIT } from "modules/program-withdraw/program-withdraw-confirm-form";
import { WITHDRAW_FORM_FIELDS } from "modules/program-withdraw/program-withdraw.helpers";
import {
  activeAssetStatusSelector,
  cancelButtonSelector,
  cancelRequest,
  withdrawingAssetStatusSelector
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

describe("Program details withdrawing", () => {
  const amountValue = "6";
  const withdrawButtonClass = testT("buttons.withdraw");
  const withdrawButtonSelector = `button[${DATA_TEST_ATTR}=${withdrawButtonClass}]`;
  const withdrawConfirmSelector = `button[id=${WITHDRAW_FORM_SUBMIT}]`;
  const withdrawingStatusText = "Withdrawing";
  const statusSelector = withdrawingAssetStatusSelector;
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
    await cancelRequest(page);
  }, ASYNC_TEST_TIMEOUT);

  it(
    "should be withdraw all",
    async () => {
      const {
        waitForSelector,
        waitForLoadBlurLoader,
        isDisabled,
        openPopup,
        submitForm,
        safeClick
      } = useTestHelpers(page);
      const withdrawAllButtonSelector = `button[type=submit]`;
      const withdrawAllSelector = `input[name=${WITHDRAW_FORM_FIELDS.withdrawAll}]`;
      const withdrawInputSelector = `input[name=${WITHDRAW_FORM_FIELDS.amount}]`;

      await openPopup(withdrawButtonSelector);
      await waitForLoadBlurLoader(".dialog");

      const isInputDisabled = await isDisabled(withdrawInputSelector);
      expect(isInputDisabled).toBeFalsy();
      const isSubmitDisabled = await isDisabled(withdrawAllButtonSelector);
      expect(isSubmitDisabled).toBeTruthy();

      await safeClick(withdrawAllSelector);

      const isInputDisabledAfterClick = await isDisabled(withdrawInputSelector);
      expect(isInputDisabledAfterClick).toBeTruthy();
      const isSubmitDisabledAfterClick = await isDisabled(
        withdrawAllButtonSelector
      );
      expect(isSubmitDisabledAfterClick).toBeFalsy();

      await submitForm();
      await safeClick(withdrawConfirmSelector);

      const isWithdrawButtonDisableAfterClick = await isDisabled(
        withdrawAllButtonSelector
      );
      expect(isWithdrawButtonDisableAfterClick).toBeTruthy();

      await waitForSelector(withdrawingAssetStatusSelector);
      await cancelRequest(page);
    },
    ASYNC_TEST_TIMEOUT
  );

  it(
    "should be cancel withdraw request",
    async () => {
      const {
        waitForSelector,
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
        await openPopup(withdrawButtonSelector);
        await enterAmount(amountValue);
        await submitForm();
        await safeClick(withdrawConfirmSelector);

        await clearAlert();
      }
      await safeClick(statusSelector);

      await openPopup(cancelButtonSelector);
      await submitForm();

      await waitForSelector(activeAssetStatusSelector);

      const alertMessage = await getLastAlertMessage();
      expect(alertMessage).toBe(successMessage);
    },
    ASYNC_TEST_TIMEOUT
  );

  it(
    "should be open withdraw popup and withdraw",
    async () => {
      const {
        waitForSelector,
        waitForLoadBlurLoader,
        openPopup,
        enterAmount,
        submitForm,
        safeClick,
        hasElement,
        getLastAlertMessage,
        getTextContent
      } = useTestHelpers(page);
      const successMessage = testT("withdraw-program.success-alert-message");
      await openPopup(withdrawButtonSelector);
      await waitForLoadBlurLoader(".dialog");

      const subtitle = await hasElement(".dialog__subtitle");
      expect(subtitle).toBeTruthy();
      const subtitleText = await getTextContent(".dialog__subtitle");
      expect((subtitleText || "").toLowerCase()).toBe(
        programName.toLowerCase()
      );

      await enterAmount(amountValue);
      await submitForm();
      await safeClick(withdrawConfirmSelector);

      const alertMessage = await getLastAlertMessage();
      expect(alertMessage).toBe(successMessage);

      const statusText = await getTextContent(statusSelector);
      expect(statusText).toBe(withdrawingStatusText);

      await waitForSelector(withdrawingAssetStatusSelector);
      await cancelRequest(page);
    },
    ASYNC_TEST_TIMEOUT
  );

  afterAll(() => {
    browser.close();
  });
});

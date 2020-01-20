import { WITHDRAW_FORM_FIELDS } from "modules/program-withdraw/program-withdraw-amount-form";
import { WITHDRAW_FORM_SUBMIT } from "modules/program-withdraw/program-withdraw-confirm-form";
import { Browser, Page } from "puppeteer";
import { PROGRAMS_ROUTE } from "routes/programs.routes";
import {
  ASYNC_TEST_TIMEOUT,
  DATA_TEST_ATTR,
  getBrowser,
  testT,
  useTestHelpers,
  VIEW_PORT
} from "utils/test-helpers";

describe("Program details", () => {
  const cancelButtonSelector = `.request-line .gv-btn`;
  const cancelRequest = async (
    page: Page,
    statusSelector: string = ".asset-status"
  ) => {
    const {
      openPopup,
      submitForm,
      safeClick,
      hasElement,
      getLastAlertMessage
      // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useTestHelpers(page);
    const hasWihdrawingRequest = await hasElement(".asset-status__withdrawing");
    const hasInvestingRequest = await hasElement(".asset-status__investing");
    if (hasWihdrawingRequest || hasInvestingRequest) {
      await safeClick(statusSelector);
      await openPopup(cancelButtonSelector);
      await submitForm();
      await getLastAlertMessage();
    }
  };

  describe("Page markup", () => {
    const programName = "entryfee0-10-20";
    const url = `${PROGRAMS_ROUTE}/${programName}`;
    let page: Page;
    let browser: Browser;

    beforeEach(async () => {
      browser = await getBrowser();
      page = await browser.newPage();
      await page.setViewport(VIEW_PORT);
      const { openAuthPage } = useTestHelpers(page);
      await openAuthPage(url);
    }, ASYNC_TEST_TIMEOUT);
    it("should be titled at program name", async () => {
      const title = await page.title();
      expect(title.toLowerCase()).toContain(programName.toLowerCase());
    });

    afterEach(() => {
      browser.close();
    });
  });
  describe("Withdraw", () => {
    const amountValue = "6";
    const withdrawButtonClass = testT("buttons.withdraw");
    const withdrawButtonSelector = `button[${DATA_TEST_ATTR}=${withdrawButtonClass}]`;
    const withdrawConfirmSelector = `button[id=${WITHDRAW_FORM_SUBMIT}]`;
    const withdrawingStatusText = "Withdrawing";
    const statusSelector = ".asset-status__withdrawing";
    const programName = "entryfee0-10-20";
    const url = `${PROGRAMS_ROUTE}/${programName}`;

    let page: Page;
    let browser: Browser;

    beforeEach(async () => {
      browser = await getBrowser();
      page = await browser.newPage();
      await page.setViewport(VIEW_PORT);
      const { openAuthPage } = useTestHelpers(page);
      await openAuthPage(url);
    }, ASYNC_TEST_TIMEOUT);

    it(
      "should be withdraw all",
      async () => {
        const { isDisabled, openPopup, submitForm, safeClick } = useTestHelpers(
          page
        );
        const withdrawAllButtonSelector = `button[type=submit]`;
        const withdrawAllSelector = `input[name=${WITHDRAW_FORM_FIELDS.withdrawAll}]`;
        const withdrawInputSelector = `input[name=${WITHDRAW_FORM_FIELDS.amount}]`;

        await openPopup(withdrawButtonSelector);
        await page.waitForSelector(".dialog > .blur-container--loaded");

        const isInputDisabled = await isDisabled(withdrawInputSelector);
        expect(isInputDisabled).toBeFalsy();
        const isSubmitDisabled = await isDisabled(withdrawAllButtonSelector);
        expect(isSubmitDisabled).toBeTruthy();

        await safeClick(withdrawAllSelector);

        const isInputDisabledAfterClick = await isDisabled(
          withdrawInputSelector
        );
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

        await page.waitForSelector(".asset-status__withdrawing");
        await cancelRequest(page);
      },
      ASYNC_TEST_TIMEOUT
    );

    it(
      "should be cancel withdraw request",
      async () => {
        const {
          openPopup,
          enterAmount,
          submitForm,
          getLastAlertMessage,
          clearAlert,
          safeClick
        } = useTestHelpers(page);
        const successMessage = testT("request-line.success-message");
        const status = await page.$(statusSelector);
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

        const alertMessage = await getLastAlertMessage();
        expect(alertMessage).toBe(successMessage);
      },
      ASYNC_TEST_TIMEOUT
    );

    it(
      "should be open withdraw popup and withdraw",
      async () => {
        const {
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
        await page.waitForSelector(".dialog > .blur-container--loaded");

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

        await page.waitForSelector(".asset-status__withdrawing");
        await cancelRequest(page);
      },
      ASYNC_TEST_TIMEOUT
    );

    afterEach(() => {
      browser.close();
    });
  });
  describe("Invest", () => {
    const amountValue = "6";
    const investButtonClass = testT("buttons.invest");
    const investButtonSelector = `button[${DATA_TEST_ATTR}=${investButtonClass}]`;
    const investingStatusText = "Investing";
    const statusSelector = ".asset-status__investing";
    const programName = "2812-2019";
    const url = `${PROGRAMS_ROUTE}/${programName}`;

    let page: Page;
    let browser: Browser;

    beforeEach(async () => {
      browser = await getBrowser();
      page = await browser.newPage();
      await page.setViewport(VIEW_PORT);
      const { openAuthPage } = useTestHelpers(page);
      await openAuthPage(url);
    }, ASYNC_TEST_TIMEOUT);

    it(
      "should be cancel invest request",
      async () => {
        const {
          openPopup,
          enterAmount,
          submitForm,
          getLastAlertMessage,
          clearAlert,
          safeClick
        } = useTestHelpers(page);
        const successMessage = testT("request-line.success-message");
        const cancelButtonSelector = `.request-line .gv-btn`;
        const status = await page.$(statusSelector);
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
        await page.waitForSelector(".dialog > .blur-container--loaded");

        const subtitle = await hasElement(".dialog__subtitle");
        expect(subtitle).toBeTruthy();
        const subtitleText = await getTextContent(".dialog__subtitle");
        expect((subtitleText || "").toLowerCase()).toBe(
          programName.toLowerCase()
        );

        await selectWallet(walletCurrency);
        await enterAmount(amountValue);
        await submitForm();

        const alertMessage = await getLastAlertMessage();
        expect(alertMessage).toBe(successMessage);

        const statusText = await getTextContent(statusSelector);
        expect(statusText).toBe(investingStatusText);

        await page.waitForSelector(".asset-status__investing");
        await cancelRequest(page);
      },
      ASYNC_TEST_TIMEOUT
    );

    afterEach(() => {
      browser.close();
    });
  });
});

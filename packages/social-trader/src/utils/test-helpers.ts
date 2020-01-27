import { DEPOSIT_FORM_FIELDS } from "components/deposit/components/deposit-form";
import dotenv from "dotenv";
import {
  ALERT_CLOSE_CLASS,
  ALERT_TEXT_CLASS
} from "modules/alert-message/components/alert-message-list/alert-message";
import puppeteer, { Browser, Page } from "puppeteer";
import { LOGIN_ROUTE } from "routes/app.routes";

import translates from "../../public/locales/en/translations.json";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

export const ASYNC_TEST_TIMEOUT = 15 * 1000;
export const DATA_TEST_ATTR = "data-test-id";
export const VIEW_PORT = { width: 1400, height: 1000 };

export const getBrowser = async () => {
  return await puppeteer.launch({
    headless: true,
    args: [`--window-size=1920,1080`]
  });
};

export const getBaseUrl = () => {
  return process.env.TEST_BASE_URL;
};
export const getTestUserName = () => {
  return process.env.TEST_USER_NAME || "";
};

export const getTestUserPassword = () => {
  return process.env.TEST_USER_PASSWORD || "";
};

export const getTranslates = () => translates;

export const testT = (path: string) =>
  path
    .split(".")
    .reduce((prev: any, curr: any) => prev && prev[curr], getTranslates()) ||
  path;

interface DoneCallback {
  (...args: any[]): any;
  fail(error?: string | { message: string }): any;
}
type ProvidesCallback = (cb: DoneCallback) => any;
export type ItFuncType = {
  title: string;
  test: (page: Page) => ProvidesCallback;
};

export const describeOnPage = (url: string, tests: ItFuncType[]) => () => {
  let page: Page;
  let browser: Browser;
  beforeAll(async () => {
    browser = await getBrowser();
    page = await browser.newPage();
    const { openAuthPage } = useTestHelpers(page);
    await openAuthPage(url);
  }, ASYNC_TEST_TIMEOUT);
  for (const { test, title } of tests) {
    it(title, async () => test(page));
  }
  afterAll(() => {
    browser.close();
  });
};

export const useTestHelpers = (page: Page) => {
  const waitForLoadBlurLoader = async (selector: string) => {
    await page.waitForSelector(`${selector} > .blur-container--loaded`);
  };
  const getStatisticsItemValue = async (label: string, loadable?: boolean) => {
    const selector = `div[${DATA_TEST_ATTR}="${testT(label)}"]`;
    if (loadable) await waitForLoadBlurLoader(selector);
    const value = (await getTextContent(selector)) || "";
    return value.trim();
  };
  const safeClick = async (selector: string) => {
    await page.waitForSelector(selector);
    await page.click(selector);
  };
  const authOnLoginForm = async () => {
    const login = getTestUserName();
    const password = getTestUserPassword();
    await safeClick("input[name=email]");
    await page.type("input[name=email]", login);
    await safeClick("input[name=password]");
    await page.type("input[name=password]", password);
    await safeClick("button[id=loginSubmit]");
  };
  const authorize = async () => {
    await openPage(LOGIN_ROUTE);
    await authOnLoginForm();
    await page.waitForSelector(".header__profile");
  };

  const openPage = async (url: string) => {
    const baseUrl = getBaseUrl();
    await page.goto(`${baseUrl}${url}`);
    await page.setViewport(VIEW_PORT);
  };

  const openAuthPage = async (url: string) => {
    await authorize();
    await openPage(url);
  };

  const openPopup = async (buttonSelector: string) => {
    await safeClick(buttonSelector);
    await page.waitForSelector(".dialog__header");
  };

  const selectWallet = async (
    walletCurrency: string,
    walletSelectName = DEPOSIT_FORM_FIELDS.walletId
  ) => {
    await safeClick(`button[name=${walletSelectName}]`);
    await safeClick(`.select__option div[${DATA_TEST_ATTR}=${walletCurrency}]`);
  };

  const enterAmount = async (
    amountValue: string | number,
    amountName = "amount"
  ) => {
    await safeClick(`input[name=${amountName}]`);
    await page.type(`input[name=${amountName}]`, String(amountValue));
  };

  const submitForm = async () => {
    await safeClick(`button[type=submit]`);
  };

  const getLastAlertMessage = async () => {
    const ALERT_TEXT_CLASS_SELECTOR = `.${ALERT_TEXT_CLASS}`;
    await page.waitForSelector(ALERT_TEXT_CLASS_SELECTOR);
    return await page.$$eval(
      ALERT_TEXT_CLASS_SELECTOR,
      elements => elements[elements.length - 1].textContent
    );
  };

  const getTextContent = async (selector: string) => {
    await page.waitForSelector(selector);
    return await page.$eval(selector, element => element.textContent);
  };

  const clearAllAlerts = async () => {
    // const selector = `button[${DATA_TEST_ATTR}=${CLEAR_ALL_ALERTS_ID}]`;
    // const hasAlerts = await hasElement(selector);
    // if (hasAlerts) await page.click(selector);
    // else {
    //   const ALERT_CLOSE_CLASS_SELECTOR = `.${ALERT_CLOSE_CLASS}`;
    //   while (await hasElement(ALERT_CLOSE_CLASS_SELECTOR)) {
    //     await clearAlert();
    //   }
    // }
  };

  const clearAlert = async () => {
    const ALERT_CLOSE_CLASS_SELECTOR = `.${ALERT_CLOSE_CLASS}`;
    await safeClick(ALERT_CLOSE_CLASS_SELECTOR);
  };

  const hasElement = (selector: string) =>
    page
      .$eval(selector, element => !!element)
      .catch(
        error =>
          error.toString() !==
          `Error: Error: failed to find element matching selector "${selector}"`
      );

  const isDisabled = async (selector: string) => {
    return await hasElement(`${selector}[disabled]`);
  };

  return {
    waitForLoadBlurLoader,
    getStatisticsItemValue,
    isDisabled,
    safeClick,
    hasElement,
    openPopup,
    clearAlert,
    authorize,
    openPage,
    openAuthPage,
    selectWallet,
    enterAmount,
    submitForm,
    getLastAlertMessage,
    getTextContent,
    clearAllAlerts
  };
};

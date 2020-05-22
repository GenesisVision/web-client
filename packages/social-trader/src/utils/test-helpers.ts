import { DEPOSIT_FORM_FIELDS } from "components/deposit/components/deposit.helpers";
import dotenv from "dotenv";
import {
  ALERT_CLOSE_CLASS,
  ALERT_TEXT_CLASS
} from "modules/alert-message/components/alert-message-list/alert-message";
import puppeteer, { Page } from "puppeteer";
import { LOGIN_ROUTE } from "routes/app.routes";
import authService from "services/auth-service";
import { GV_TOKEN_KEY } from "utils/get-token-name";

import translates from "../../public/static/locales/en/translations.json";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env.production" });

export const ASYNC_TEST_TIMEOUT = 25 * 1000;
export const DATA_TEST_ATTR = "data-test-id";
export const VIEW_PORT = { width: 1400, height: 1000 };

export const getBrowser = async () => {
  return await puppeteer.launch({
    headless: true,
    args: [
      `--window-size=1920,1080`,
      "--no-sandbox",
      "--disable-setuid-sandbox"
    ]
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

export const useTestHelpers = (page: Page) => {
  const getElement = (selector: string) => page.$(selector);
  const waitForSelector = (selector: string) => page.waitForSelector(selector);
  const getAuth = async () => {
    const cookies = await page.cookies();
    const tokenCookie = cookies.find(cookie => cookie.name === GV_TOKEN_KEY);
    return String(
      tokenCookie ? authService.generateTokenString(tokenCookie.value) : ""
    );
  };
  const waitForLoadBlurLoader = async (selector: string) => {
    await waitForSelector(`${selector} > .blur-container--loaded`);
  };
  const getDataIdElementSelector = (
    selector: string,
    element: string = "div"
  ): string => `${element}[${DATA_TEST_ATTR}="${selector}"]`;
  const getStatisticsItemValue = async (label: string, loadable?: boolean) => {
    const selector = getDataIdElementSelector(testT(label));
    if (loadable) await waitForLoadBlurLoader(selector);
    const value = (await getTextContent(selector)) || "";
    return value.trim();
  };
  const safeClick = async (selector: string) => {
    await waitForSelector(selector);
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
    await waitForSelector(".header__profile");
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
    await waitForSelector(".dialog__header");
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
    await waitForSelector(ALERT_TEXT_CLASS_SELECTOR);
    return await getTextContent(ALERT_TEXT_CLASS_SELECTOR);
  };

  const getTextContent = async (selector: string): Promise<string> => {
    await waitForSelector(selector);
    const element = await getElement(selector);
    if (!element) return "";
    return (await (
      await element.getProperty("textContent")
    ).jsonValue()) as string;
  };

  const clearAlert = async () => {
    const ALERT_CLOSE_CLASS_SELECTOR = `.${ALERT_CLOSE_CLASS}`;
    await safeClick(ALERT_CLOSE_CLASS_SELECTOR);
  };

  const hasElement = (selector: string) =>
    getElement(selector).catch(
      error =>
        error.toString() !==
        `Error: Error: failed to find element matching selector "${selector}"`
    );

  const isDisabled = async (selector: string) => {
    return await hasElement(`${selector}[disabled]`);
  };

  return {
    getDataIdElementSelector,
    waitForSelector,
    getAuth,
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
    getTextContent
  };
};

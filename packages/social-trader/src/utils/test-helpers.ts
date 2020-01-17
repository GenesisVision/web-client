import dotenv from "dotenv";
import puppeteer, { Page } from "puppeteer";
import { LOGIN_ROUTE } from "routes/app.routes";

import translates from "../../public/locales/en/translations.json";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

export const ASYNC_TEST_TIMEOUT = 10000;

export const getPage = async () => {
  const browser = await puppeteer.launch({ headless: true });
  return await browser.newPage();
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

export const authorize = async ({ page }: { page: Page }) => {
  await openPage({
    page,
    url: LOGIN_ROUTE
  });
  await authOnLoginForm(page);
  await page.waitForSelector(".header__profile");
};

export const openPage = async ({ page, url }: { page: Page; url: string }) => {
  const baseUrl = getBaseUrl();
  await page.goto(`${baseUrl}${url}`);
};

export const openAuthPage = async ({
  page,
  url
}: {
  page: Page;
  url: string;
}) => {
  await authorize({ page });
  await openPage({
    page,
    url
  });
};

const authOnLoginForm = async (page: Page) => {
  const login = getTestUserName();
  const password = getTestUserPassword();
  await page.click("input[name=email]");
  await page.type("input[name=email]", login);
  await page.click("input[name=password]");
  await page.type("input[name=password]", password);
  await page.click("button[id=loginSubmit]");
};

export const getTranslates = () => translates;

export const testT = (path: string) =>
  path
    .split(".")
    .reduce((prev: any, curr: any) => prev && prev[curr], getTranslates());

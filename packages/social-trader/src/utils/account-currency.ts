import { NextPageContext } from "next";
import { getCookie, removeCookie, setCookie } from "utils/cookie";
import { CurrencyEnum, NextPageWithReduxContext } from "utils/types";

export const DEFAULT_ACCOUNT_CURRENCY: CurrencyEnum = "USD";

export const ACCOUNT_CURRENCY_KEY = "accountCurrency";

export const getAccountCurrency = (
  ctx?: NextPageWithReduxContext | NextPageContext
) => {
  return (
    (getCookie(ACCOUNT_CURRENCY_KEY, ctx) as CurrencyEnum) ||
    DEFAULT_ACCOUNT_CURRENCY
  );
};

export const setAccountCurrency = (currency: CurrencyEnum) => {
  setCookie(ACCOUNT_CURRENCY_KEY, currency);
};

export const cleanAccountCurrency = () => {
  removeCookie(ACCOUNT_CURRENCY_KEY);
};

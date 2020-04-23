import { cookieServiceCreator } from "utils/cookie-service.creator";
import { CurrencyEnum } from "utils/types";

export const DEFAULT_ACCOUNT_CURRENCY: CurrencyEnum = "USD";

export const ACCOUNT_CURRENCY_KEY = "accountCurrency";

export const {
  get: getAccountCurrency,
  set: setAccountCurrency,
  clear: cleanAccountCurrency
} = cookieServiceCreator<CurrencyEnum>({
  key: ACCOUNT_CURRENCY_KEY,
  initialState: DEFAULT_ACCOUNT_CURRENCY
});

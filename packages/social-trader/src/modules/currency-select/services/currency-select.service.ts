import profileApi from "services/api-client/profile-api";
import authService from "services/auth-service";
import { setAccountCurrency } from "utils/account-currency";
import { CurrencyEnum } from "utils/types";

export const updateCurrency = (currency: CurrencyEnum) => {
  setAccountCurrency(currency);
};

export const postAccountCurrency = (currency: CurrencyEnum) => {
  const authorization = authService.getAuthArg();
  return profileApi
    .updateUserPlatformCurrency(authorization, { currency })
    .then(() => currency);
};

import { api } from "services/api-client/swagger-custom-client";
import { setAccountCurrency } from "utils/account-currency";
import { CurrencyEnum } from "utils/types";

export const updateCurrency = (currency: CurrencyEnum) => {
  setAccountCurrency(currency);
};

export const postAccountCurrency = (currency: CurrencyEnum) => {
  return api
    .profile()
    .updateUserPlatformCurrency({ currency })
    .then(() => currency);
};

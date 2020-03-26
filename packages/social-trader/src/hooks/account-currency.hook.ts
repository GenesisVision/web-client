import { useSelector } from "react-redux";
import { headerAccountCurrencySelector } from "reducers/header-reducer";
import { getAccountCurrency } from "utils/account-currency";
import { CurrencyEnum } from "utils/types";

export const useAccountCurrency = (): CurrencyEnum => {
  const reduxCurrency = useSelector(headerAccountCurrencySelector);
  const cookieCurrency = getAccountCurrency();
  return reduxCurrency || cookieCurrency;
};

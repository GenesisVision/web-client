import { ProfileHeaderInfoAction } from "components/header/actions/header-actions";
import { ISelectChangeEvent } from "components/select/select";
import { useAccountCurrency } from "hooks/account-currency.hook";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currenciesSelector } from "reducers/platform-reducer";
import { CurrencyEnum } from "utils/types";

import {
  postAccountCurrency,
  updateCurrency
} from "../services/currency-select.service";
import CurrencySelect from "./currency-select";

const _CurrencySelectContainer: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch();
  const updateCookieMiddleware = (currency: CurrencyEnum) => {
    updateCurrency(currency);
  };
  const updateHeaderMiddleware = () => {
    dispatch(ProfileHeaderInfoAction);
  };

  const { sendRequest } = useApiRequest({
    request: postAccountCurrency,
    middleware: [updateCookieMiddleware, updateHeaderMiddleware]
  });
  const currencyValues = useSelector(currenciesSelector);
  const currency = useAccountCurrency();
  const handleChange = useCallback((event: ISelectChangeEvent) => {
    const currency = event.target.value as CurrencyEnum;
    sendRequest(currency);
  }, []);
  return (
    <CurrencySelect
      condition={!!currency && !!currencyValues}
      className={className}
      value={currency}
      onChange={handleChange}
      currencyValues={currencyValues as CurrencyEnum[]}
    />
  );
};

interface Props {
  className?: string;
}

const CurrencySelectContainer = React.memo(_CurrencySelectContainer);
export default CurrencySelectContainer;

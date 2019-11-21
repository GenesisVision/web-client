import "./currency-select.scss";

import classNames from "classnames";
import { ISelectChangeEvent } from "components/select/select";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";
import { currenciesSelector } from "reducers/platform-reducer";
import { CurrencyEnum } from "utils/types";

import { updateCurrency } from "../services/currency-select.service";
import CurrencySelect from "./currency-select";
import { CurrencySelectLoader } from "./currency-select.loader";

const _CurrencySelectContainer: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch();
  const currencyValues = useSelector(currenciesSelector);
  const currency = useSelector(currencySelector);
  const handleChange = useCallback(
    (event: ISelectChangeEvent) =>
      dispatch(updateCurrency(event.target.value as CurrencyEnum)),
    []
  );
  return (
    <CurrencySelect
      condition={!!currency && !!currencyValues}
      loader={<CurrencySelectLoader />}
      className={classNames("currency-select", className)}
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

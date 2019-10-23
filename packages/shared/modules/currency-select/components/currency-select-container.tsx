import "./currency-select.scss";

import classNames from "classnames";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ISelectChangeEvent } from "shared/components/select/select";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { currenciesSelector } from "shared/reducers/platform-reducer";
import { CurrencyEnum } from "shared/utils/types";

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
      currencyValues={currencyValues}
    />
  );
};

interface Props {
  className?: string;
}

const CurrencySelectContainer = React.memo(_CurrencySelectContainer);
export default CurrencySelectContainer;

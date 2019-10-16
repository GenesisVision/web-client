import "./currency-select.scss";

import classNames from "classnames";
import React, { useCallback } from "react";
import { ResolveThunks, connect } from "react-redux";
import { ActionCreatorsMapObject, Dispatch, bindActionCreators, compose } from "redux";
import { ISelectChangeEvent } from "shared/components/select/select";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { currenciesSelector } from "shared/reducers/platform-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { CurrencyEnum } from "shared/utils/types";

import { updateCurrency } from "../services/currency-select.service";
import CurrencySelect from "./currency-select";
import { CurrencySelectLoader } from "./currency-select.loader";

const _CurrencySelectContainer: React.FC<Props> = ({
  service,
  currencyValues,
  className,
  currency
}) => {
  const handleChange = useCallback(
    (event: ISelectChangeEvent) =>
      service.updateCurrency(event.target.value as CurrencyEnum),
    [service]
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

const mapStateToProps = (state: RootState): StateProps => ({
  currencyValues: currenciesSelector(state) as CurrencyEnum[],
  currency: currencySelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { updateCurrency },
    dispatch
  )
});

interface Props extends StateProps, DispatchProps, OwnProps {}

interface StateProps {
  currencyValues: CurrencyEnum[];
  currency: CurrencyEnum;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  updateCurrency: typeof updateCurrency;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface OwnProps {
  className?: string;
}

const CurrencySelectContainer = compose<React.ComponentType<OwnProps>>(
  connect<StateProps, DispatchProps, OwnProps, RootState>(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_CurrencySelectContainer);
export default CurrencySelectContainer;

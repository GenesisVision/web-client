import "./currency-select.scss";

import classNames from "classnames";
import * as React from "react";
import { ResolveThunks, connect } from "react-redux";
import { ActionCreatorsMapObject, Dispatch, bindActionCreators } from "redux";
import { ISelectChangeEvent } from "shared/components/select/select";
import RootState from "shared/reducers/root-reducer";
import { ActionType, CurrencyEnum } from "shared/utils/types";

import { HEADER_CURRENCY_VALUES } from "../currency-select.constants";
import { updateCurrency } from "../services/currency-select.service";
import CurrencySelect from "./currency-select";
import { CurrencySelectLoader } from "./currency-select.loader";

class _CurrencySelectContainer extends React.PureComponent<Props> {
  handleChange = (event: ISelectChangeEvent) => {
    this.props.service.updateCurrency(event.target.value as CurrencyEnum);
  };
  render() {
    const {
      currencyValues = Object.values(HEADER_CURRENCY_VALUES),
      className,
      currency
    } = this.props;
    return (
      <CurrencySelect
        condition={!!currency && !!currencyValues}
        loader={<CurrencySelectLoader />}
        className={classNames("currency-select", className)}
        value={currency}
        onChange={this.handleChange}
        currencyValues={currencyValues as CurrencyEnum[]}
      />
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  const { accountSettings, platformData } = state;
  return {
    currencyValues: platformData.data
      ? (platformData.data.currencies as CurrencyEnum[])
      : undefined, //TODO change currencies to CurrencyEnum in api
    currency: accountSettings.currency
  };
};

const mapDispatchToProps = (dispatch: Dispatch<ActionType>): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { updateCurrency },
    dispatch
  )
});

interface Props extends StateProps, DispatchProps, OwnProps {}

interface StateProps {
  currencyValues?: CurrencyEnum[];
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

const CurrencySelectContainer = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(_CurrencySelectContainer);
export default CurrencySelectContainer;

import "./currency-select.scss";

import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { OnChangeEvent } from "shared/components/select/select";
import RootState from "shared/reducers/root-reducer";
import { ActionType } from "shared/utils/types";

import {
  CURRENCY_VALUES_ENUM,
  HEADER_CURRENCY_VALUES
} from "../currency-select.constants";
import { updateCurrency } from "../services/currency-select.service";
import CurrencySelect from "./currency-select";

interface ICurrencySelectContainerProps {
  className?: string;
}

interface ICurrencySelectContainerStateProps {
  currencyValues: CURRENCY_VALUES_ENUM[] | string[];
  currency: CURRENCY_VALUES_ENUM | string;
}

interface ICurrencySelectContainerDispatchProps {
  service: {
    updateCurrency(value: any): void;
  };
}

class CurrencySelectContainer extends React.Component<
  ICurrencySelectContainerProps &
    ICurrencySelectContainerStateProps &
    ICurrencySelectContainerDispatchProps
> {
  handleChange = (event: OnChangeEvent) => {
    this.props.service.updateCurrency(event.target.value);
  };
  render() {
    const {
      currencyValues = Object.values(HEADER_CURRENCY_VALUES),
      className,
      currency
    } = this.props;
    return (
      <CurrencySelect
        className={classNames("currency-select", className)}
        value={currency}
        onChange={this.handleChange}
        currencyValues={currencyValues as CURRENCY_VALUES_ENUM[]}
      />
    );
  }
}

const mapStateToProps = (
  state: RootState
): ICurrencySelectContainerStateProps => {
  const { accountSettings, platformData } = state;
  return {
    currencyValues: platformData.data ? platformData.data.currencies : [],
    currency: accountSettings.currency
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<ActionType>
): ICurrencySelectContainerDispatchProps => ({
  service: bindActionCreators({ updateCurrency }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencySelectContainer);

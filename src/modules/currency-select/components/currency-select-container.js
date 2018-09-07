import CurrencySelect from "modules/currency-select/components/currency-select";
import PropTypes from "prop-types";
import React, { Component } from "react";

export const CURRENCY_FILTER_VALUES = {
  GVT: "GVT",
  ETH: "Ethereum",
  BTC: "Bitcoin",
  ADA: "Cardano",
  USD: "US Dollar",
  EUR: "Euro"
};

class CurrencySelectContainer extends Component {
  state = { value: "GVT" };

  handleSelect = value => {
    this.setState({ value });
  };

  render() {
    return (
      <CurrencySelect value={this.state.value} onSelect={this.handleSelect}>
        {Object.keys(CURRENCY_FILTER_VALUES).map(currency => {
          return (
            <option value={currency}>{CURRENCY_FILTER_VALUES[currency]}</option>
          );
        })}
      </CurrencySelect>
    );
  }
}

CurrencySelectContainer.propTypes = {};

export default CurrencySelectContainer;

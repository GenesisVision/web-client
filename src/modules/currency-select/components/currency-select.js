import "./currency-select.scss";

import classnames from "classnames";
import Select from "components/select/select";
import React, { Component } from "react";

class CurrencySelect extends Component {
  render() {
    const { value, onChange, className, currencyValues } = this.props;
    return (
      <Select
        className={classnames("currency-select", className)}
        value={value}
        onChange={onChange}
      >
        {Object.keys(currencyValues).map(currency => {
          return (
            <option value={currency} key={currency}>
              {currencyValues[currency]}
            </option>
          );
        })}
      </Select>
    );
  }
}

export default CurrencySelect;

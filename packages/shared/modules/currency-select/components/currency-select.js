import "./currency-select.scss";

import classnames from "classnames";
import React, { Component } from "react";
import Select from "shared/components/select/select";

class CurrencySelect extends Component {
  render() {
    const { value, onChange, className, currencyValues } = this.props;
    return (
      <Select
        className={classnames("currency-select", className)}
        value={value}
        onChange={onChange}
      >
        {currencyValues.map(currency => {
          return (
            <option value={currency} key={currency}>
              {currency}
            </option>
          );
        })}
      </Select>
    );
  }
}

export default CurrencySelect;

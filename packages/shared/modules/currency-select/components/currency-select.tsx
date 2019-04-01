import "./currency-select.scss";

import classNames from "classnames";
import * as React from "react";
import Select, { SelectChangeEvent } from "shared/components/select/select";

import { CURRENCY_VALUES_ENUM } from "../currency-select.constants";

interface ICurrencySelectProps {
  value: CURRENCY_VALUES_ENUM | string;
  onChange(event: SelectChangeEvent, child: JSX.Element): void;
  className?: string;
  currencyValues: CURRENCY_VALUES_ENUM[];
}

class CurrencySelect extends React.Component<ICurrencySelectProps> {
  render() {
    const { value, onChange, className, currencyValues } = this.props;
    return (
      <Select
        name="currency"
        className={classNames("currency-select", className)}
        value={value}
        onChange={onChange}
      >
        {currencyValues.map(currency => (
          <option value={currency} key={currency}>
            {currency}
          </option>
        ))}
      </Select>
    );
  }
}

export default CurrencySelect;

import Select, { ISelectChangeEvent } from "components/select/select";
import withLoader from "decorators/with-loader";
import * as React from "react";
import { CurrencyEnum, SizesType } from "utils/types";

const _CurrencySelect: React.FC<Props> = ({
  size,
  value,
  onChange,
  className,
  currencyValues
}) => {
  console.log(currencyValues);
  return (
    <Select
      size={size}
      data-test-id={value}
      name="currency"
      className={className}
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
};

interface Props {
  size?: SizesType;
  value: CurrencyEnum | string;
  onChange: (event: ISelectChangeEvent, child: JSX.Element) => void;
  currencyValues: CurrencyEnum[];
  className?: string;
}

const CurrencySelect = React.memo(withLoader(_CurrencySelect));
export default CurrencySelect;

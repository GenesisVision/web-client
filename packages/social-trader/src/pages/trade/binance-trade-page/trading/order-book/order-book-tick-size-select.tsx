import Select, { ISelectChangeEvent } from "components/select/select";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import React, { useContext, useEffect } from "react";
import { formatValue } from "utils/formatter";

import { getTickValues } from "./order-book.helpers";

interface Props {
  value?: { value: string; default: boolean };
  setValue: (value: { value: string; default: boolean }) => void;
}

const _OrderBookTickSizeSelect: React.FC<Props> = ({ value, setValue }) => {
  const { tickSize } = useContext(TerminalInfoContext);
  useEffect(() => {
    if (tickSize) setValue({ value: formatValue(tickSize), default: true });
  }, [tickSize]);
  if (!tickSize || !value) return null;
  const tickValues = getTickValues(+tickSize);
  return (
    <Select
      fixedWidth={false}
      size={"small"}
      name="column"
      value={value.value}
      onChange={({ target: { value } }: ISelectChangeEvent) =>
        setValue({ value, default: value === tickSize })
      }
    >
      {tickValues.map(value => (
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </Select>
  );
};

export const OrderBookTickSizeSelect = React.memo(_OrderBookTickSizeSelect);

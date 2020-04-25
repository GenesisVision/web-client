import Select, { ISelectChangeEvent } from "components/select/select";
import React, { useEffect } from "react";

import { getTickValues, useSymbolTick } from "./order-book.helpers";

interface Props {
  value?: string;
  setValue: (value: string) => void;
}

const _OrderBookTickSizeSelect: React.FC<Props> = ({ value, setValue }) => {
  const tickSize = useSymbolTick();
  useEffect(() => {
    if (tickSize) setValue(String(+tickSize));
  }, [tickSize]);
  if (!tickSize) return null;
  const tickValues = getTickValues(+tickSize);
  return (
    <Select
      name="column"
      value={value!}
      onChange={(e: ISelectChangeEvent) => setValue(e.target.value)}
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

import Select, { ISelectChangeEvent } from "components/select/select";
import { COLUMN_VALUES } from "pages/trade/binance-trade-page/trading/market-watch/market-watch.helpers";
import React from "react";

interface Props {
  column: string;
  setColumn: (value: string) => void;
}

const _MarketWatchColumn: React.FC<Props> = ({ column, setColumn }) => {
  return (
    <Select
      fixedWidth={false}
      size={"small"}
      name="column"
      value={column}
      onChange={(e: ISelectChangeEvent) => setColumn(e.target.value)}
    >
      {COLUMN_VALUES.map(({ value, label }) => (
        <option value={value} key={value}>
          {label}
        </option>
      ))}
    </Select>
  );
};

export const MarketWatchColumn = React.memo(_MarketWatchColumn);

import Select, { ISelectChangeEvent } from "components/select/select";
import {
  FUTURES_COLUMN_VALUES,
  SPOT_COLUMN_VALUES
} from "pages/trade/binance-trade-page/trading/market-watch/market-watch.helpers";
import React from "react";

import { TerminalType } from "../terminal.types";

interface Props {
  column: string;
  setColumn: (value: string) => void;
  terminalType: TerminalType;
}

const _MarketWatchColumn: React.FC<Props> = ({
  column,
  setColumn,
  terminalType
}) => {
  const columns =
    terminalType === "futures" ? FUTURES_COLUMN_VALUES : SPOT_COLUMN_VALUES;
  return (
    <Select
      fixedWidth={false}
      size={"small"}
      name="column"
      value={column}
      onChange={(e: ISelectChangeEvent) => setColumn(e.target.value)}
    >
      {columns.map(({ value, label }) => (
        <option value={value} key={value}>
          {label}
        </option>
      ))}
    </Select>
  );
};

export const MarketWatchColumn = React.memo(_MarketWatchColumn);

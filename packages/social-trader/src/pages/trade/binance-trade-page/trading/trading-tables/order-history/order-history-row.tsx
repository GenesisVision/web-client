import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { Text } from "components/text/text";
import { BinanceOrderStatus } from "gv-api-web";
import { terminalMoneyFormat } from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import {
  getSymbolFilters,
  setUpperFirstLetter
} from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { OrderSide } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext } from "react";
import { formatDate } from "utils/dates";

interface Props {
  orderStatus?: BinanceOrderStatus;
  time: number | Date;
  symbol: string;
  type: string;
  side: OrderSide;
  price: number;
  stopPrice: number;
  origQty: number;
  filled: number;
  total: number;
  executed: number;
  amount: number;
}

const _OrderHistoryRow: React.FC<Props> = ({
  executed,
  amount,
  orderStatus,
  time,
  symbol,
  type,
  side,
  price,
  stopPrice,
  total
}) => {
  const { exchangeInfo } = useContext(TerminalInfoContext);
  if (!exchangeInfo) return null;
  const symbolFilters = getSymbolFilters(exchangeInfo, symbol);
  const { tickSize } = symbolFilters.priceFilter;
  const { stepSize } = symbolFilters.lotSizeFilter;
  return (
    <TableRow>
      <TableCell firstOffset={false}>{formatDate(time)}</TableCell>
      <TableCell>{symbol}</TableCell>
      <TableCell>{type}</TableCell>
      <TableCell>
        <Text color={setUpperFirstLetter(side) === "Buy" ? "green" : "red"}>
          {side}
        </Text>
      </TableCell>
      <TableCell>
        {terminalMoneyFormat({ amount: price, tickSize: String(tickSize) })}
      </TableCell>
      <TableCell>
        {terminalMoneyFormat({
          amount: executed,
          tickSize: String(stepSize)
        })}
      </TableCell>
      <TableCell>
        {terminalMoneyFormat({
          amount: amount,
          tickSize: String(stepSize)
        })}
      </TableCell>
      <TableCell>
        {terminalMoneyFormat({ amount: total, tickSize: String(tickSize) })}
      </TableCell>
      <TableCell>
        {stopPrice
          ? terminalMoneyFormat({
              amount: stopPrice,
              tickSize: String(tickSize)
            })
          : "—"}
      </TableCell>
      <TableCell>{orderStatus}</TableCell>
    </TableRow>
  );
};

export const OrderHistoryRow = React.memo(_OrderHistoryRow);

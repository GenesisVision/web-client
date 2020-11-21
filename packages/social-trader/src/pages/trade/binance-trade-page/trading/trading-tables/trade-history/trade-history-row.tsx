import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { Text } from "components/text/text";
import { terminalMoneyFormat } from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import { getSymbolFilters } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { OrderSide } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext } from "react";
import { formatDate } from "utils/dates";

interface Props {
  time: number | Date;
  symbol: string;
  side: OrderSide;
  price: number;
  commission: number;
  quantity: number;
  total: number;
}

const _TradeHistoryRow: React.FC<Props> = ({
  commission,
  quantity,
  time,
  symbol,
  side,
  price,
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
      <TableCell>
        <Text color={side === "Buy" ? "green" : "red"}>{side}</Text>
      </TableCell>
      <TableCell>
        {terminalMoneyFormat({ amount: price, tickSize: String(tickSize) })}
      </TableCell>
      <TableCell>
        {terminalMoneyFormat({
          amount: quantity,
          tickSize: String(stepSize)
        })}
      </TableCell>
      <TableCell>
        {terminalMoneyFormat({
          amount: commission,
          tickSize: String(stepSize)
        })}
      </TableCell>
      <TableCell>
        {terminalMoneyFormat({ amount: total, tickSize: String(tickSize) })}
      </TableCell>
    </TableRow>
  );
};

export const TradeHistoryRow = React.memo(_TradeHistoryRow);

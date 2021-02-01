import TableCellComponent from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { Text } from "components/text/text";
import { terminalMoneyFormat } from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalTickerContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-ticker.context";
import { getSymbolData, getSymbolFilters } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { OrderSide } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext } from "react";
import styled from "styled-components";
import { formatDate } from "utils/dates";
import { formatValue } from "utils/formatter";
import { DEFAULT_DECIMAL_SCALE } from "constants/constants";

interface Props {
  time: number | Date;
  symbol: string;
  side: OrderSide;
  price: number;
  commissionAsset?: string;
  commission?: number;
  quantity: number;
  total: number;
}

const TableCell = styled(TableCellComponent)`
  padding: 10px;
  box-sizing: border-box;
`;

const _TradeHistoryRow: React.FC<Props> = ({
  commissionAsset,
  commission,
  quantity,
  time,
  symbol,
  side,
  price,
  total
}) => {
  const { items } = useContext(TerminalTickerContext);
  const { exchangeInfo } = useContext(TerminalInfoContext);
  if (!exchangeInfo || !items) return null;
  const symbolFilters = getSymbolFilters(exchangeInfo, symbol);
  const { tickSize } = symbolFilters.priceFilter;
  const { stepSize } = symbolFilters.lotSizeFilter;

  const symbolData = getSymbolData(items, symbol);

  return (
    <TableRow>
      <TableCell firstOffset={false}>{formatDate(time)}</TableCell>
      <TableCell>{symbol}</TableCell>
      <TableCell>
        <Text color={side.toLowerCase() === "buy" ? "green" : "red"}>
          {side}
        </Text>
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
        {commission &&
          commissionAsset &&
          formatValue(commission, DEFAULT_DECIMAL_SCALE)}{" "}
        {commissionAsset}
      </TableCell>
      <TableCell>
        {`${terminalMoneyFormat({
          amount: total,
          tickSize: String(tickSize)
        })} ${symbolData?.quoteAsset}`}
      </TableCell>
    </TableRow>
  );
};

export const TradeHistoryRow = React.memo(_TradeHistoryRow);

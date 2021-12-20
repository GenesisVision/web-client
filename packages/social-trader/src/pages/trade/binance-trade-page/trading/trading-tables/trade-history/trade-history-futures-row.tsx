import TableCellComponent from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { Text } from "components/text/text";
import { terminalMoneyFormat } from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalTickerContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-ticker.context";
import {
  DEFAULT_TICKSIZE,
  getSymbolData,
  getSymbolFilters
} from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { FuturesOrder } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { formatDate } from "utils/dates";

import { getFuturesOpenOrderSideLabel } from "../../terminal-futures.helpers";

const TableCell = styled(TableCellComponent)`
  padding: 10px;
  box-sizing: border-box;
`;

const _TradeHistoryFuturesRow: React.FC<FuturesOrder> = ({
  positionSide,
  side,
  symbol,
  updateTime,
  lastFilledQuantity,
  commission,
  commissionAsset,
  realizedProfit,
  lastFilledPrice
}) => {
  const { items } = useContext(TerminalTickerContext);
  const [t] = useTranslation();
  const { exchangeInfo } = useContext(TerminalInfoContext);
  if (!exchangeInfo || !items) return null;
  const symbolFilters = getSymbolFilters(exchangeInfo, symbol);
  const { tickSize } = symbolFilters.priceFilter;
  const { stepSize } = symbolFilters.lotSizeFilter;

  const symbolData = getSymbolData(items, symbol);

  if (!symbolData) {
    return null;
  }

  return (
    <TableRow>
      <TableCell firstOffset={false}>
        {formatDate(new Date(updateTime))}
      </TableCell>
      <TableCell>{symbol}</TableCell>
      <TableCell>
        <Text color={side === "Buy" ? "green" : "red"}>
          {getFuturesOpenOrderSideLabel(t, positionSide, side)}
        </Text>
      </TableCell>
      <TableCell>
        {terminalMoneyFormat({
          amount: lastFilledPrice!,
          tickSize: String(tickSize)
        })}
      </TableCell>
      <TableCell>
        {`${terminalMoneyFormat({
          amount: lastFilledQuantity!,
          tickSize: String(stepSize)
        })} ${symbolData.baseAsset}`}
      </TableCell>
      <TableCell>
        {terminalMoneyFormat({
          amount: commission!,
          tickSize: DEFAULT_TICKSIZE
        })}{" "}
        {commissionAsset}
      </TableCell>
      <TableCell>
        {`${terminalMoneyFormat({
          amount: realizedProfit!,
          tickSize: DEFAULT_TICKSIZE
        })} ${symbolData.quoteAsset}`}
      </TableCell>
    </TableRow>
  );
};

export const TradeHistoryFuturesRow = React.memo(_TradeHistoryFuturesRow);

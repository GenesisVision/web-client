import TableCellComponent from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { Text } from "components/text/text";
import { DEFAULT_DECIMAL_SCALE } from "constants/constants";
import { terminalMoneyFormat } from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalTickerContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-ticker.context";
import {
  getSymbolData,
  getSymbolFilters,
  setUpperFirstLetter
} from "pages/trade/binance-trade-page/trading/terminal.helpers";
import {
  FuturesOrder,
  OrderSide
} from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { formatDate } from "utils/dates";
import { formatValue } from "utils/formatter";

import { getFuturesOpenOrderSideLabel } from "../../terminal-futures.helpers";

const TableCell = styled(TableCellComponent)`
  padding: 10px;
  box-sizing: border-box;
`;

const _TradeHistoryFuturesRow: React.FC<FuturesOrder> = ({
  positionSide,
  side,
  symbol,
  time,
  price,
  quantity,
  commission,
  commissionAsset,
  realizedProfit
}) => {
  const { items } = useContext(TerminalTickerContext);
  const [t] = useTranslation();
  const { exchangeInfo } = useContext(TerminalInfoContext);
  if (!exchangeInfo || !items) return null;
  const symbolFilters = getSymbolFilters(exchangeInfo, symbol);
  const { tickSize } = symbolFilters.priceFilter;
  const { stepSize } = symbolFilters.lotSizeFilter;

  const symbolData = getSymbolData(items, symbol);

  return (
    <TableRow>
      <TableCell firstOffset={false}>{formatDate(new Date(time))}</TableCell>
      <TableCell>{symbol}</TableCell>
      <TableCell>
        <Text color={side === "Buy" ? "green" : "red"}>
          {getFuturesOpenOrderSideLabel(t, positionSide, side)}
        </Text>
      </TableCell>
      <TableCell>
        {terminalMoneyFormat({ amount: price, tickSize: String(tickSize) })}
      </TableCell>
      <TableCell>
        {`${terminalMoneyFormat({
          amount: quantity,
          tickSize: String(stepSize)
        })} ${symbolData!.baseAsset}`}
      </TableCell>
      <TableCell>
        {formatValue(commission, DEFAULT_DECIMAL_SCALE)} {commissionAsset}
      </TableCell>
      <TableCell>
        {`${terminalMoneyFormat({
          amount: realizedProfit!,
          tickSize: String(tickSize)
        })} ${symbolData?.quoteAsset}`}
      </TableCell>
    </TableRow>
  );
};

export const TradeHistoryFuturesRow = React.memo(_TradeHistoryFuturesRow);

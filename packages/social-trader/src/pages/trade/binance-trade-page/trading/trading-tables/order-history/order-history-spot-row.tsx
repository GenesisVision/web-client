import TableCellComponent from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { Text } from "components/text/text";
import { BinanceOrderStatus } from "gv-api-web";
import { terminalMoneyFormat } from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import {
  getSymbolFilters,
  setUpperFirstLetter
} from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { OrderSide } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext } from "react";
import styled from "styled-components";
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
  total?: number;
  executed?: number;
  amount: number;
}

const TableCell = styled(TableCellComponent)`
  padding: 10px;
  box-sizing: border-box;
`;

const _OrderHistorySpotRow: React.FC<Props> = ({
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
      <TableCell>{setUpperFirstLetter(type)}</TableCell>
      <TableCell>
        <Text color={side.toLowerCase() === "buy" ? "green" : "red"}>
          {setUpperFirstLetter(side)}
        </Text>
      </TableCell>
      <TableCell>
        {terminalMoneyFormat({ amount: price, tickSize: String(tickSize) })}
      </TableCell>
      <TableCell>
        {executed &&
          terminalMoneyFormat({
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
        {total &&
          terminalMoneyFormat({ amount: total, tickSize: String(tickSize) })}
      </TableCell>
      <TableCell>
        {+stopPrice
          ? terminalMoneyFormat({
              amount: stopPrice,
              tickSize: String(tickSize)
            })
          : "—"}
      </TableCell>
      <TableCell>{setUpperFirstLetter(orderStatus)}</TableCell>
    </TableRow>
  );
};

export const OrderHistorySpotRow = React.memo(_OrderHistorySpotRow);

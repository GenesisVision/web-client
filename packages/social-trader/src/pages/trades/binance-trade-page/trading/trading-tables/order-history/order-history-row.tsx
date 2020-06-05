import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { terminalMoneyFormat } from "pages/trades/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { OrderSide } from "pages/trades/binance-trade-page/trading/terminal.types";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import React, { useContext } from "react";
import { formatDate } from "utils/dates";

interface Props {
  orderId: number;
  time: number;
  symbol: string;
  type: string;
  side: OrderSide;
  price: string;
  origQty: string;
  filled: number;
  total: number;
}

const _OrderHistoryRow: React.FC<Props> = ({
  orderId,
  time,
  symbol,
  type,
  side,
  price,
  origQty,
  filled,
  total
}) => {
  const { tickSize, stepSize } = useContext(TradingInfoContext);
  return (
    <TableRow>
      <TableCell firstOffset={false}>{formatDate(time)}</TableCell>
      <TableCell>{symbol}</TableCell>
      <TableCell>{type}</TableCell>
      <TableCell>{side}</TableCell>
      <TableCell>{terminalMoneyFormat({ amount: price, tickSize })}</TableCell>
      <TableCell>
        {terminalMoneyFormat({ amount: origQty, tickSize: stepSize })}
      </TableCell>
      <TableCell>{filled}</TableCell>
      <TableCell>
        {terminalMoneyFormat({ amount: total, tickSize: stepSize })}
      </TableCell>
    </TableRow>
  );
};

export const OrderHistoryRow = React.memo(_OrderHistoryRow);

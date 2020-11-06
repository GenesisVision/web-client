import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { terminalMoneyFormat } from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import { OrderSide } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext } from "react";
import { formatDate } from "utils/dates";

interface Props {
  time: number | Date;
  symbol: string;
  type: string;
  side: OrderSide;
  price: number;
  origQty: number;
  filled: number;
  total: number;
}

const _OrderHistoryRow: React.FC<Props> = ({
  time,
  symbol,
  type,
  side,
  price,
  origQty,
  filled,
  total
}) => {
  const { tickSize, stepSize } = useContext(TerminalInfoContext);
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

import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { OrderSide } from "pages/trades/binance-trade-page/trading/trading.types";
import React from "react";
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
  return (
    <TableRow>
      <TableCell>{formatDate(time)}</TableCell>
      <TableCell>{symbol}</TableCell>
      <TableCell>{type}</TableCell>
      <TableCell>{side}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{origQty}</TableCell>
      <TableCell>{filled}</TableCell>
      <TableCell>{total}</TableCell>
    </TableRow>
  );
};

export const OrderHistoryRow = React.memo(_OrderHistoryRow);

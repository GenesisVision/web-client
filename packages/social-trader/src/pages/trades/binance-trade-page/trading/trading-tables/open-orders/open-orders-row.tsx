import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import useApiRequest from "hooks/api-request.hook";
import {
  TradeAuthDataType,
  useTradeAuth
} from "pages/trades/binance-trade-page/binance-trade.helpers";
import { cancelOrder } from "pages/trades/binance-trade-page/trading/services/binance-http.service";
import { OrderSide } from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useCallback } from "react";
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

const _OpenOrdersRow: React.FC<Props> = ({
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
  const { authData } = useTradeAuth();
  const { sendRequest, isPending } = useApiRequest({
    request: ({
      options,
      authData
    }: {
      options: { symbol: string; orderId: string; useServerTime?: boolean };
      authData: TradeAuthDataType;
    }) => cancelOrder(options, authData)
  });
  const handleCancel = useCallback(() => {
    sendRequest({ options: { symbol, orderId: String(orderId) }, authData });
  }, [symbol, orderId, authData]);
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
      <TableCell>
        <GVButton
          disabled={isPending}
          isPending={isPending}
          size={GV_BTN_SIZE.SMALL}
          color={"danger"}
          onClick={handleCancel}
        >
          Cancel
        </GVButton>
      </TableCell>
    </TableRow>
  );
};

export const OpenOrdersRow = React.memo(_OpenOrdersRow);

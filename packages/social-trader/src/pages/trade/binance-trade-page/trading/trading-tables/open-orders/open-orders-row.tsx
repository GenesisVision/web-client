import { Button } from "components/button/button";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import useApiRequest from "hooks/api-request.hook";
import { terminalMoneyFormat } from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/terminal-methods.context";
import {
  OrderSide,
  TerminalAuthDataType
} from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useCallback, useContext } from "react";
import { formatDate } from "utils/dates";

interface Props {
  orderId: number;
  time: number | Date;
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
  const { cancelOrder } = useContext(TerminalMethodsContext);
  const { exchangeAccountId, tickSize, stepSize } = useContext(
    TerminalInfoContext
  );
  const { sendRequest, isPending } = useApiRequest({
    request: ({
      options,
      exchangeAccountId
    }: {
      options: { symbol: string; orderId: string; useServerTime?: boolean };
      exchangeAccountId: string;
    }) => cancelOrder(options, exchangeAccountId)
  });
  const handleCancel = useCallback(() => {
    sendRequest({
      options: { symbol, orderId: String(orderId) },
      exchangeAccountId
    });
  }, [symbol, orderId, exchangeAccountId]);
  return (
    <TableRow>
      <TableCell firstOffset={false}>{formatDate(new Date(time))}</TableCell>
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
      <TableCell>
        <Button
          noPadding
          variant={"text"}
          disabled={isPending}
          isPending={isPending}
          size={"small"}
          color={"danger"}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  );
};

export const OpenOrdersRow = React.memo(_OpenOrdersRow);

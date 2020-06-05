import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import useApiRequest from "hooks/api-request.hook";
import { terminalMoneyFormat } from "pages/trades/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { TerminalInfoContext } from "pages/trades/binance-trade-page/trading/terminal-info.context";
import { TerminalMethodsContext } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import {
  OrderSide,
  TerminalAuthDataType
} from "pages/trades/binance-trade-page/trading/terminal.types";
import React, { useCallback, useContext } from "react";
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
  const { cancelOrder } = useContext(TerminalMethodsContext);
  const { authData, tickSize, stepSize } = useContext(TerminalInfoContext);
  const { sendRequest, isPending } = useApiRequest({
    request: ({
      options,
      authData
    }: {
      options: { symbol: string; orderId: string; useServerTime?: boolean };
      authData: TerminalAuthDataType;
    }) => cancelOrder(options, authData)
  });
  const handleCancel = useCallback(() => {
    sendRequest({ options: { symbol, orderId: String(orderId) }, authData });
  }, [symbol, orderId, authData]);
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
      <TableCell>
        <GVButton
          noPadding
          variant={"text"}
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

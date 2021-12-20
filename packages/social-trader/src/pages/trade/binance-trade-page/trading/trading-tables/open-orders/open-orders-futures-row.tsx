import { Button } from "components/button/button";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { Text } from "components/text/text";
import useApiRequest from "hooks/api-request.hook";
import { terminalMoneyFormat } from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import { TerminalTickerContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-ticker.context";
import {
  getSymbolData,
  getSymbolFilters
} from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { FuturesOrder } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { formatDate } from "utils/dates";

import {
  getFuturesOpenOrderSideLabel,
  getFuturesTriggerConditionsLabel,
  getFuturesTypeLabel
} from "../../terminal-futures.helpers";

const _OpenOrdersFuturesRow: React.FC<FuturesOrder> = ({
  orderId,
  positionSide,
  price,
  quantity,
  quantityFilled,
  reduceOnly,
  side,
  stopPrice,
  symbol,
  closePosition,
  time,
  type,
  workingType,
  originalType
}) => {
  const [t] = useTranslation();
  const { items } = useContext(TerminalTickerContext);
  const { cancelOrder } = useContext(TerminalMethodsContext);
  const { exchangeAccountId, exchangeInfo, setSymbol } = useContext(
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

  if (!exchangeInfo || !items) return null;

  const symbolFilters = getSymbolFilters(exchangeInfo, symbol);
  const { tickSize } = symbolFilters.priceFilter;
  const { stepSize } = symbolFilters.lotSizeFilter;

  const symbolData = getSymbolData(items, symbol);

  return (
    <TableRow>
      <TableCell firstOffset={false}>{formatDate(new Date(time))}</TableCell>
      <TableCell
        style={{ cursor: "pointer" }}
        onClick={() =>
          setSymbol({
            baseAsset: symbolData!.baseAsset,
            quoteAsset: symbolData!.quoteAsset
          })
        }
      >
        {symbol}
      </TableCell>
      <TableCell>{getFuturesTypeLabel(t, type)}</TableCell>
      <TableCell>
        <Text color={side === "Buy" ? "green" : "red"}>
          {getFuturesOpenOrderSideLabel(t, positionSide, side)}
        </Text>
      </TableCell>
      <TableCell>
        {!!String(price)
          ? terminalMoneyFormat({
              amount: price,
              tickSize: String(tickSize)
            })
          : "–"}
      </TableCell>
      <TableCell>
        {closePosition
          ? t("Close Position")
          : `${terminalMoneyFormat({
              amount: quantity,
              tickSize: String(stepSize)
            })} ${symbolData!.baseAsset}`}
      </TableCell>
      <TableCell>
        {`${terminalMoneyFormat({
          amount: quantityFilled,
          tickSize: String(stepSize)
        })} ${symbolData!.baseAsset}`}
      </TableCell>
      <TableCell>{reduceOnly ? t("Yes") : t("No")}</TableCell>
      <TableCell>
        {getFuturesTriggerConditionsLabel({
          t,
          tickSize,
          stopPrice,
          workingType,
          type: originalType,
          side
        })}
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
          {t("Cancel")}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export const OpenOrdersFuturesRow = React.memo(_OpenOrdersFuturesRow);

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
  getSymbolFilters,
  setUpperFirstLetter
} from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { OrderSide } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { formatDate } from "utils/dates";

interface Props {
  orderId: number;
  time: number | Date;
  symbol: string;
  type: string;
  side: OrderSide;
  stopPrice: string;
  price: string;
  origQty: string;
  filled: number;
  total: number;
}

const _OpenOrdersSpotRow: React.FC<Props> = ({
  orderId,
  time,
  symbol,
  type,
  side,
  stopPrice,
  price,
  origQty,
  filled,
  total
}) => {
  const [t] = useTranslation();
  const { items } = useContext(TerminalTickerContext);
  const { cancelOrder } = useContext(TerminalMethodsContext);
  const { exchangeAccountId, exchangeInfo } = useContext(TerminalInfoContext);

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
      <TableCell>{symbol}</TableCell>
      <TableCell>{type}</TableCell>
      <TableCell>
        <Text color={side.toLowerCase() === "buy" ? "green" : "red"}>
          {setUpperFirstLetter(side)}
        </Text>
      </TableCell>
      <TableCell>
        {terminalMoneyFormat({ amount: price, tickSize: String(tickSize) })}
      </TableCell>
      <TableCell>
        {terminalMoneyFormat({ amount: origQty, tickSize: String(stepSize) })}
      </TableCell>
      <TableCell>{filled}%</TableCell>
      <TableCell>
        {`${terminalMoneyFormat({
          amount: total,
          tickSize: String(tickSize)
        })} ${symbolData?.quoteAsset}`}
      </TableCell>
      <TableCell>
        {stopPrice
          ? terminalMoneyFormat({
              amount: stopPrice,
              tickSize: String(tickSize)
            })
          : "—"}
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

export const OpenOrdersSpotRow = React.memo(_OpenOrdersSpotRow);

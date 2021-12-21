import { Center } from "components/center/center";
import TableCellComponent from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { Text } from "components/text/text";
import { terminalMoneyFormat } from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import {
  getSymbolData,
  getSymbolFilters
} from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { FuturesOrder } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { formatDate } from "utils/dates";

import { LiquidationPriceInfoBadge } from "../../components/liquidation-price/liquidation-price-info-badge";
import { TerminalTickerContext } from "../../contexts/terminal-ticker.context";
import {
  getFuturesOpenOrderSideLabel,
  getFuturesTriggerConditionsLabel,
  getFuturesTypeLabel
} from "../../terminal-futures.helpers";

const TableCell = styled(TableCellComponent)`
  padding: 10px;
  box-sizing: border-box;
`;

const _OrderHistoryFuturesRow: React.FC<FuturesOrder> = ({
  symbol,
  updateTime,
  side,
  positionSide,
  averagePrice,
  price,
  quoteQuantityFilled,
  originalType,
  quantity,
  reduceOnly,
  workingType,
  stopPrice,
  orderStatus
}) => {
  const { items } = useContext(TerminalTickerContext);
  const { exchangeInfo } = useContext(TerminalInfoContext);
  const [t] = useTranslation();
  if (!exchangeInfo || !items) return null;
  const symbolFilters = getSymbolFilters(exchangeInfo, symbol);
  const { tickSize } = symbolFilters.priceFilter;
  const { stepSize } = symbolFilters.lotSizeFilter;
  const symbolData = getSymbolData(items, symbol);

  if (!symbolData) {
    return null;
  }

  return (
    <TableRow translucent={orderStatus === "Canceled"}>
      <TableCell firstOffset={false}>
        {formatDate(new Date(updateTime))}
      </TableCell>
      <TableCell>{symbol}</TableCell>
      <TableCell>{getFuturesTypeLabel(t, originalType)}</TableCell>
      <TableCell>
        <Text color={side === "Buy" ? "green" : "red"}>
          {getFuturesOpenOrderSideLabel(t, positionSide, side)}
        </Text>
      </TableCell>
      <TableCell>
        {!!+averagePrice
          ? terminalMoneyFormat({
              amount: averagePrice,
              tickSize: String(tickSize)
            })
          : "–"}
      </TableCell>
      <TableCell>
        <Center>
          {originalType === "Market"
            ? "–"
            : terminalMoneyFormat({
                amount: price,
                tickSize: String(tickSize)
              })}
          {originalType === "Liquidation" && <LiquidationPriceInfoBadge />}
        </Center>
      </TableCell>
      <TableCell>
        {`${terminalMoneyFormat({
          amount: quoteQuantityFilled!,
          tickSize: String(stepSize)
        })} ${symbolData.baseAsset}`}
      </TableCell>
      <TableCell>
        {`${terminalMoneyFormat({
          amount: quantity,
          tickSize: String(stepSize)
        })} ${symbolData.baseAsset}`}
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
      <TableCell>{orderStatus}</TableCell>
    </TableRow>
  );
};

export const OrderHistoryFuturesRow = React.memo(_OrderHistoryFuturesRow);

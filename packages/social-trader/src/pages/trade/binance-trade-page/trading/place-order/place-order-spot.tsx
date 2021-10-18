import { Center } from "components/center/center";
import { DoubleButton } from "components/double-button/double-button";
import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import { WalletIcon } from "components/icon/wallet-icon";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import { DEFAULT_DECIMAL_SCALE } from "constants/constants";
import useApiRequest from "hooks/api-request.hook";
import useTab from "hooks/tab.hook";
import { TerminalDefaultBlock } from "pages/trade/binance-trade-page/trading/components/terminal-default-block/terminal-default-block";
import { truncated } from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import {
  formatValueWithTick,
  getDecimalScale,
  getSymbol
} from "pages/trade/binance-trade-page/trading/terminal.helpers";
import {
  OrderSide,
  OrderType
} from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useCallback, useContext, useState } from "react";
import { formatValue } from "utils/formatter";

import { LimitTradeSpotForm } from "./limit-trade-spot-form";
import { MarketTradeSpotForm } from "./market-trade-spot-form";
import {
  getBalance,
  getSpotTradeType,
  mapPlaceOrderErrors
} from "./place-order.helpers";
import styles from "./place-order.module.scss";
import {
  FilterValues,
  ISpotPlaceOrderDefaultFormValues,
  ISpotStopLimitFormValues,
  SPOT_TRADE_FORM_FIELDS
} from "./place-order.types";
import { StopLimitTradeSpotForm } from "./stop-limit-trade-spot-form";

interface Props {
  price: string;
  lastTrade: number;
  filterValues: FilterValues;
}

const _PlaceOrderSpot: React.FC<Props> = ({
  filterValues,
  lastTrade,
  price
}) => {
  const { tradeRequest } = useContext(TerminalMethodsContext);

  const {
    tickSize,
    stepSize,
    exchangeAccountId,
    accountInfo,
    symbol: { baseAsset, quoteAsset }
  } = useContext(TerminalInfoContext);

  const [side, setSide] = useState<OrderSide>("Buy");
  const { tab, setTab } = useTab<OrderType>("Limit");

  const { sendRequest, status } = useApiRequest({
    isUseLocalizationOnError: false,
    errorAlertHandler: mapPlaceOrderErrors,
    request: tradeRequest
  });

  const handleSubmit = useCallback(
    (values: ISpotStopLimitFormValues | ISpotPlaceOrderDefaultFormValues) => {
      const type = getSpotTradeType({
        stopPrice: "stopPrice" in values ? values.stopPrice : undefined,
        side,
        type: tab,
        currentPrice: lastTrade,
        price: values[SPOT_TRADE_FORM_FIELDS.price]
      });
      const quantity = formatValueWithTick(
        values[SPOT_TRADE_FORM_FIELDS.quantity],
        stepSize
      );
      return sendRequest({
        ...values,
        price: truncated(
          +values[SPOT_TRADE_FORM_FIELDS.price],
          getDecimalScale(formatValue(tickSize))
        ),
        quantity,
        accountId: exchangeAccountId,
        side,
        type,
        symbol: getSymbol(baseAsset, quoteAsset)
      });
    },
    [tickSize, stepSize, exchangeAccountId, baseAsset, quoteAsset, side, tab]
  );

  const walletAsset = side === "Buy" ? quoteAsset : baseAsset;
  const balance = accountInfo
    ? getBalance(accountInfo.balances, walletAsset)
    : 0;
  const balanceBase = accountInfo
    ? getBalance(accountInfo.balances, baseAsset)
    : 0;
  const balanceQuote = accountInfo
    ? getBalance(accountInfo.balances, quoteAsset)
    : 0;

  return (
    <TerminalDefaultBlock>
      <Row>
        <DoubleButton
          size={"small"}
          first={{
            selected: side === "Buy",
            enable: side !== "Buy",
            handleClick: () => setSide("Buy"),
            label: "BUY"
          }}
          second={{
            color: "danger",
            selected: side === "Sell",
            enable: side !== "Sell",
            handleClick: () => setSide("Sell"),
            label: "SELL"
          }}
        />
      </Row>
      <Row>
        <GVTabs value={tab} onChange={setTab}>
          <GVTab value={"Limit"} label={"LIMIT"} />
          <GVTab value={"Market"} label={"MARKET"} />
          <GVTab value={"TakeProfitLimit"} label={"STOP LIMIT"} />
        </GVTabs>
      </Row>
      <Row>
        <RowItem size={"small"}>
          <Center className={styles["place-order__wallet-icon"]}>
            <WalletIcon />
          </Center>
        </RowItem>
        <RowItem>
          <Text muted>
            {formatValue(balance, DEFAULT_DECIMAL_SCALE)} {walletAsset}
          </Text>
        </RowItem>
      </Row>
      <Row>
        {tab === "Limit" && (
          <LimitTradeSpotForm
            filterValues={filterValues}
            status={status}
            balanceBase={balanceBase}
            balanceQuote={balanceQuote}
            outerPrice={price}
            onSubmit={handleSubmit}
            side={side}
          />
        )}
        {tab === "Market" && (
          <MarketTradeSpotForm
            filterValues={filterValues}
            status={status}
            balanceBase={balanceBase}
            balanceQuote={balanceQuote}
            outerPrice={price}
            onSubmit={handleSubmit}
            side={side}
          />
        )}
        {tab === "TakeProfitLimit" && (
          <StopLimitTradeSpotForm
            filterValues={filterValues}
            status={status}
            balanceBase={balanceBase}
            balanceQuote={balanceQuote}
            outerPrice={price}
            onSubmit={handleSubmit}
            side={side}
          />
        )}
      </Row>
    </TerminalDefaultBlock>
  );
};

export const PlaceOrderSpot = React.memo(_PlaceOrderSpot);

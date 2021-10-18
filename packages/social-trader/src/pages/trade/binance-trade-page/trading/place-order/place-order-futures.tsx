import { Center } from "components/center/center";
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
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import { TerminalPlaceOrderContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-place-order.context";
import { getSymbol } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { OrderType } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useCallback, useContext } from "react";
import { formatValue } from "utils/formatter";

import { PlaceOrderSelectHedgeMode } from "./components/place-order-select-hedge-mode/place-order-select-hedge-mode";
import { LimitTradeFuturesForm } from "./limit-trade-futures-form";
import { MarketTradeFuturesForm } from "./market-trade-futures-form";
import {
  getBalance,
  getFuturesQuantityValue,
  getFuturesTradeType,
  getPositionSide,
  mapPlaceOrderErrors
} from "./place-order.helpers";
import styles from "./place-order.module.scss";
import {
  FilterValues,
  FUTURES_TRADE_FORM_FIELDS,
  IFuturesPlaceOrderHandleSubmitValues,
  IFuturesStopLimitPlaceOrderHandleSubmitValues
} from "./place-order.types";
import { StopLimitTradeFuturesForm } from "./stop-limit-trade-futures-form";

interface Props {
  price: string;
  lastTrade: number;
  filterValues: FilterValues;
}

const _PlaceOrderFutures: React.FC<Props> = ({
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
  const { currentPositionMode, setPlaceOrderMode, placeOrderMode } = useContext(
    TerminalPlaceOrderContext
  );

  const { tab, setTab } = useTab<OrderType>("Limit");

  const { sendRequest, status } = useApiRequest({
    isUseLocalizationOnError: false,
    errorAlertHandler: mapPlaceOrderErrors,
    request: tradeRequest
  });

  const handleSubmit = useCallback(
    (
      values:
        | IFuturesPlaceOrderHandleSubmitValues
        | IFuturesStopLimitPlaceOrderHandleSubmitValues
    ) => {
      const {
        percentMode,
        sliderBuy,
        sliderSell,
        side,
        ...restValues
      } = values;

      const type = getFuturesTradeType({
        stopPrice: "stopPrice" in values ? values.stopPrice : undefined,
        side,
        type: tab,
        currentPrice: lastTrade
      });

      const quantity = getFuturesQuantityValue({
        percentMode,
        quantity: values[FUTURES_TRADE_FORM_FIELDS.quantity],
        side,
        sliderBuy,
        sliderSell,
        stepSize
      });

      const positionSide = getPositionSide({
        side: values.side,
        placeOrderMode: placeOrderMode!
      });
      // POST ONLY TIF !!!
      // side : "buy" | "sell"
      // time in force
      // quantity Transform percent!!!	Cannot be sent with closePosition=true(Close-All)
      // reduceOnly "true" or "false". default "false". Cannot be sent in Hedge Mode; cannot be sent with closePosition=true
      // price (Limit price)
      // stopPrice only for stop limit
      // closePosition true, false；Close-All，used with STOP_MARKET or TAKE_PROFIT_MARKET.
      // priceProtect ??? "TRUE" or "FALSE", default "FALSE". Used with STOP/STOP_MARKET or TAKE_PROFIT/TAKE_PROFIT_MARKET orders.

      // console.log({
      //   ...restValues,
      //   side: values.side,
      //   positionSide,
      //   price: values[FUTURES_TRADE_FORM_FIELDS.price],
      //   quantity,
      //   accountId: exchangeAccountId,
      //   type,
      //   symbol: getSymbol(baseAsset, quoteAsset)
      // });

      return sendRequest({
        ...restValues,
        side: values.side,
        positionSide,
        price: values[FUTURES_TRADE_FORM_FIELDS.price],
        quantity,
        accountId: exchangeAccountId,
        type,
        symbol: getSymbol(baseAsset, quoteAsset)
      });
    },
    [
      tickSize,
      stepSize,
      exchangeAccountId,
      baseAsset,
      quoteAsset,
      tab,
      currentPositionMode,
      placeOrderMode
    ]
  );

  // const balance = accountInfo
  //   ? getBalance(accountInfo.balances, quoteAsset)
  //   : 0;

  const balance = 1000;

  return (
    <TerminalDefaultBlock>
      {currentPositionMode === "Hedge" && (
        <Row onlyOffset>
          <PlaceOrderSelectHedgeMode
            placeOrderMode={placeOrderMode}
            setPlaceOrderMode={setPlaceOrderMode}
          />
        </Row>
      )}
      <Row size={"small"}>
        <GVTabs value={tab} onChange={setTab}>
          <GVTab value={"Limit"} label={"LIMIT"} />
          <GVTab value={"Market"} label={"MARKET"} />
          <GVTab value={"TakeProfit"} label={"STOP LIMIT"} />
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
            {formatValue(balance, DEFAULT_DECIMAL_SCALE)} {quoteAsset}
          </Text>
        </RowItem>
      </Row>
      <Row>
        {tab === "Limit" && (
          <LimitTradeFuturesForm
            placeOrderMode={placeOrderMode!}
            filterValues={filterValues}
            balance={balance}
            outerPrice={price}
            onSubmit={handleSubmit}
            status={status}
          />
        )}
        {tab === "Market" && (
          <MarketTradeFuturesForm
            placeOrderMode={placeOrderMode!}
            filterValues={filterValues}
            balance={balance}
            onSubmit={handleSubmit}
            status={status}
          />
        )}
        {tab === "TakeProfit" && (
          <StopLimitTradeFuturesForm
            placeOrderMode={placeOrderMode!}
            filterValues={filterValues}
            balance={balance}
            outerPrice={price}
            onSubmit={handleSubmit}
            status={status}
          />
        )}
      </Row>
    </TerminalDefaultBlock>
  );
};

export const PlaceOrderFutures = React.memo(_PlaceOrderFutures);

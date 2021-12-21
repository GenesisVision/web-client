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

import { TerminalFuturesBalanceContext } from "../contexts/terminal-futures-balance.context";
import { TradingPriceContext } from "../contexts/trading-price.context";
import { PlaceOrderSelectHedgeMode } from "./components/place-order-select-hedge-mode/place-order-select-hedge-mode";
import { LimitTradeFuturesForm } from "./limit-trade-futures-form";
import { MarketTradeFuturesForm } from "./market-trade-futures-form";
import {
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
  lastTrade: number;
  markPrice: number;
  filterValues: FilterValues;
}

const _PlaceOrderFutures: React.FC<Props> = ({
  filterValues,
  lastTrade,
  markPrice
}) => {
  const { price } = useContext(TradingPriceContext);
  const { tradeRequest } = useContext(TerminalMethodsContext);
  const { availableBalance } = useContext(TerminalFuturesBalanceContext);

  const {
    stepSize,
    exchangeAccountId,
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
        lastPrice: lastTrade,
        markPrice,
        workingType: "workingType" in values ? values.workingType : undefined
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
        placeOrderMode
      });

      return sendRequest({
        ...restValues,
        reduceOnly:
          currentPositionMode === "OneWay"
            ? values[FUTURES_TRADE_FORM_FIELDS.reduceOnly]
            : undefined,
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
      currentPositionMode,
      placeOrderMode,
      stepSize,
      exchangeAccountId,
      baseAsset,
      quoteAsset,
      tab,
      markPrice,
      lastTrade
    ]
  );

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
            {formatValue(availableBalance, DEFAULT_DECIMAL_SCALE)} {quoteAsset}
          </Text>
        </RowItem>
      </Row>
      <Row>
        {tab === "Limit" && (
          <LimitTradeFuturesForm
            placeOrderMode={placeOrderMode}
            filterValues={filterValues}
            balance={availableBalance}
            outerPrice={price}
            onSubmit={handleSubmit}
            status={status}
          />
        )}
        {tab === "Market" && (
          <MarketTradeFuturesForm
            placeOrderMode={placeOrderMode}
            filterValues={filterValues}
            balance={availableBalance}
            onSubmit={handleSubmit}
            status={status}
          />
        )}
        {tab === "TakeProfit" && (
          <StopLimitTradeFuturesForm
            placeOrderMode={placeOrderMode}
            filterValues={filterValues}
            balance={availableBalance}
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

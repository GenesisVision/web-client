import { Center } from "components/center/center";
import { DefaultBlock } from "components/default.block/default.block";
import { DoubleButton } from "components/double-button/double-button";
import { GV_BTN_SIZE } from "components/gv-button";
import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import { WalletIcon } from "components/icon/wallet-icon";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { SIZES } from "constants/constants";
import useApiRequest from "hooks/api-request.hook";
import useTab from "hooks/tab.hook";
import { StopLimitTradeForm } from "pages/trades/binance-trade-page/trading/place-order/stop-limit-trade-form";
import { TerminalMethodsContext } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { TradingPriceContext } from "pages/trades/binance-trade-page/trading/trading-price.context";
import { getSymbol } from "pages/trades/binance-trade-page/trading/trading.helpers";
import {
  OrderSide,
  OrderType
} from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useCallback, useContext, useState } from "react";

import { LimitTradeForm } from "./limit-trade-form";
import { MarketTradeForm } from "./market-trade-form";
import { getBalance, IPlaceOrderFormValues } from "./place-order.helpers";
import styles from "./place-order.module.scss";

const _PlaceOrder: React.FC = () => {
  const { tradeRequest } = useContext(TerminalMethodsContext);
  const { price } = useContext(TradingPriceContext);

  const {
    authData,
    exchangeInfo,
    accountInfo,
    symbol: { baseAsset, quoteAsset }
  } = useContext(TradingInfoContext);

  const [side, setSide] = useState<OrderSide>("BUY");
  const { tab, setTab } = useTab<OrderType>("LIMIT");

  const { sendRequest, status } = useApiRequest({
    request: tradeRequest
  });

  const handleSubmit = useCallback(
    (values: IPlaceOrderFormValues) => {
      return sendRequest({
        ...values,
        side,
        type: tab,
        symbol: getSymbol(baseAsset, quoteAsset),
        authData
      });
    },
    [authData, baseAsset, quoteAsset, side, tab]
  );

  const walletAsset = side === "BUY" ? quoteAsset : baseAsset;
  const balance = accountInfo
    ? getBalance(accountInfo.balances, walletAsset)
    : undefined;
  return (
    <DefaultBlock size={SIZES.SMALL} roundedBorder={false} bordered>
      <Row>
        <DoubleButton
          size={GV_BTN_SIZE.SMALL}
          first={{
            selected: side === "BUY",
            enable: side !== "BUY",
            handleClick: () => setSide("BUY"),
            label: "BUY"
          }}
          second={{
            color: "danger",
            selected: side === "SELL",
            enable: side !== "SELL",
            handleClick: () => setSide("SELL"),
            label: "SELL"
          }}
        />
      </Row>
      <Row>
        <GVTabs value={tab} onChange={setTab}>
          <GVTab value={"LIMIT"} label={"LIMIT"} />
          <GVTab value={"MARKET"} label={"MARKET"} />
          <GVTab value={"STOP_LOSS_LIMIT"} label={"STOP LIMIT"} />
        </GVTabs>
      </Row>
      {accountInfo && (
        <Row>
          <RowItem small>
            <Center className={styles["place-order__wallet-icon"]}>
              <WalletIcon />
            </Center>
          </RowItem>
          <RowItem>
            <MutedText>
              {balance} {walletAsset}
            </MutedText>
          </RowItem>
        </Row>
      )}
      {exchangeInfo && accountInfo && (
        <Row>
          {tab === "LIMIT" && (
            <LimitTradeForm
              status={status}
              exchangeInfo={exchangeInfo}
              accountInfo={accountInfo}
              outerPrice={+price}
              onSubmit={handleSubmit}
              direction={side}
              baseAsset={baseAsset}
              quoteAsset={quoteAsset}
            />
          )}
          {tab === "MARKET" && (
            <MarketTradeForm
              status={status}
              exchangeInfo={exchangeInfo}
              accountInfo={accountInfo}
              outerPrice={+price}
              onSubmit={handleSubmit}
              direction={side}
              baseAsset={baseAsset}
              quoteAsset={quoteAsset}
            />
          )}
          {tab === "STOP_LOSS_LIMIT" && (
            <StopLimitTradeForm
              status={status}
              exchangeInfo={exchangeInfo}
              accountInfo={accountInfo}
              outerPrice={+price}
              onSubmit={handleSubmit}
              direction={side}
              baseAsset={baseAsset}
              quoteAsset={quoteAsset}
            />
          )}
        </Row>
      )}
    </DefaultBlock>
  );
};

export const PlaceOrder = React.memo(_PlaceOrder);

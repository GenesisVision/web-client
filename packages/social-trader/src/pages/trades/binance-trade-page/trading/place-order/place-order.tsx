import { DefaultBlock } from "components/default.block/default.block";
import { DoubleButton } from "components/double-button/double-button";
import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import { Row } from "components/row/row";
import { SIZES } from "constants/constants";
import useApiRequest from "hooks/api-request.hook";
import useTab from "hooks/tab.hook";
import { useTradeAuth } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { MarketTradeFormContainer } from "pages/trades/binance-trade-page/trading/place-order/market-trade-form.container";
import { tradeRequest } from "pages/trades/binance-trade-page/trading/services/binance-http.service";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { TradingPriceContext } from "pages/trades/binance-trade-page/trading/trading-price.context";
import { getSymbol } from "pages/trades/binance-trade-page/trading/trading.helpers";
import {
  OrderSide,
  OrderType
} from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useCallback, useContext, useState } from "react";

import { LimitTradeFormContainer } from "./limit-trade-form.container";
import { getBalance, IPlaceOrderFormValues } from "./place-order.helpers";

interface Props {}

const _PlaceOrder: React.FC<Props> = () => {
  const { price } = useContext(TradingPriceContext);

  const {
    accountInfo,
    symbol: { baseAsset, quoteAsset }
  } = useContext(TradingInfoContext);

  const [side, setSide] = useState<OrderSide>("BUY");
  const { tab, setTab } = useTab<OrderType>("LIMIT");

  const { authData } = useTradeAuth();

  const { sendRequest } = useApiRequest({ request: tradeRequest });

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
  return (
    <DefaultBlock size={SIZES.SMALL} roundedBorder={false} bordered>
      <Row>
        <h3>Place order</h3>
      </Row>
      <Row>
        <DoubleButton
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
          {getBalance(accountInfo?.balances, walletAsset)} {walletAsset}
        </Row>
      )}
      <Row>
        {tab === "LIMIT" && (
          <LimitTradeFormContainer
            outerPrice={+price}
            onSubmit={handleSubmit}
            direction={side}
            baseAsset={baseAsset}
            quoteAsset={quoteAsset}
          />
        )}
        {tab === "MARKET" && (
          <MarketTradeFormContainer
            outerPrice={+price}
            onSubmit={handleSubmit}
            direction={side}
            baseAsset={baseAsset}
            quoteAsset={quoteAsset}
          />
        )}
      </Row>
    </DefaultBlock>
  );
};

export const PlaceOrder = React.memo(_PlaceOrder);

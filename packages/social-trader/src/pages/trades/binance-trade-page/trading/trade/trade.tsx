import { DefaultBlock } from "components/default.block/default.block";
import { DoubleButton } from "components/double-button/double-button";
import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import { Row } from "components/row/row";
import useApiRequest from "hooks/api-request.hook";
import useTab from "hooks/tab.hook";
import { useTradeAuth } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { getTradeMethod } from "pages/trades/binance-trade-page/trading/services/binance-http.service";
import {
  ILimitTradeFormValues,
  LimitTradeForm
} from "pages/trades/binance-trade-page/trading/trade/limit-trade-form";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { TradingPriceContext } from "pages/trades/binance-trade-page/trading/trading-price.context";
import { getSymbol } from "pages/trades/binance-trade-page/trading/trading.helpers";
import {
  OrderSide,
  OrderType
} from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useCallback, useContext, useState } from "react";
import { safeGetElemFromArray } from "utils/helpers";

interface Props {}

const _Trade: React.FC<Props> = () => {
  const { price } = useContext(TradingPriceContext);

  const {
    accountInfo,
    symbol: { baseAsset, quoteAsset }
  } = useContext(TradingInfoContext);

  const [side, setSide] = useState<OrderSide>("BUY");
  const { tab, setTab } = useTab<OrderType>("LIMIT");

  const { authData } = useTradeAuth();

  const { sendRequest } = useApiRequest({ request: getTradeMethod(side) });

  const handleSubmit = useCallback(
    (values: ILimitTradeFormValues) => {
      return sendRequest({
        ...values,
        type: tab,
        symbol: getSymbol(baseAsset, quoteAsset),
        authData
      });
    },
    [authData, baseAsset, quoteAsset]
  );

  return (
    <DefaultBlock solid>
      <Row>
        <h3>Place order</h3>
      </Row>
      <Row>
        <DoubleButton
          firstEnable={side !== "BUY"}
          firstHandleClick={() => setSide("BUY")}
          firstLabel={"BUY"}
          secondEnable={side !== "SELL"}
          secondHandleClick={() => setSide("SELL")}
          secondLabel={"SELL"}
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
          {
            safeGetElemFromArray(
              accountInfo?.balances,
              ({ asset }) => asset === baseAsset
            ).free
          }{" "}
          {baseAsset}
        </Row>
      )}
      <Row>
        {tab === "LIMIT" && (
          <LimitTradeForm
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

export const Trade = React.memo(_Trade);

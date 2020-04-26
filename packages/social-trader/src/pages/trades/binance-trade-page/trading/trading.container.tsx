import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { TradeAuthDataType } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { MarketWatchBlock } from "pages/trades/binance-trade-page/trading/market-watch/market-watch.block";
import { OpenOrdersBlock } from "pages/trades/binance-trade-page/trading/open-orders/open-orders.block";
import { OrderBookBlock } from "pages/trades/binance-trade-page/trading/order-book/order-book.block";
import { Trade } from "pages/trades/binance-trade-page/trading/trade/trade";
import { TradesBlock } from "pages/trades/binance-trade-page/trading/trades/trades.block";
import { TradingInfoContextProvider } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { TradingPriceContextProvider } from "pages/trades/binance-trade-page/trading/trading-price.context";
import React from "react";

import styles from "./trading.module.scss";

interface Props {
  authData: TradeAuthDataType;
}

const _TradingContainer: React.FC<Props> = ({ authData }) => {
  return (
    <TradingInfoContextProvider>
      <Row className={styles["trading"]}>
        <MarketWatchBlock />
      </Row>
      <Row center={false} className={styles["trading"]}>
        <TradingPriceContextProvider>
          <RowItem>
            <OrderBookBlock />
          </RowItem>
          <RowItem>
            <Trade />
          </RowItem>
          <RowItem>
            <TradesBlock />
          </RowItem>
        </TradingPriceContextProvider>
      </Row>
      <Row onlyOffset>
        <OpenOrdersBlock />
      </Row>
    </TradingInfoContextProvider>
  );
};

export const TradingContainer = React.memo(_TradingContainer);

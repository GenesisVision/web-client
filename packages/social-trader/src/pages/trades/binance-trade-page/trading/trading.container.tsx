import { ResponsiveContainer } from "components/responsive-container/responsive-container";
import { TradeAuthDataType } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { ChartBlock } from "pages/trades/binance-trade-page/trading/chart/chart-block";
import { MarketWatchBlock } from "pages/trades/binance-trade-page/trading/market-watch/market-watch.block";
import { OrderBookBlock } from "pages/trades/binance-trade-page/trading/order-book/order-book.block";
import { PlaceOrder } from "pages/trades/binance-trade-page/trading/place-order/place-order";
import { SymbolSummaryContainer } from "pages/trades/binance-trade-page/trading/symbol-summary/symbol-summary";
import { SymbolSummarySmallContainer } from "pages/trades/binance-trade-page/trading/symbol-summary/symbol-summary-small";
import { TradesBlock } from "pages/trades/binance-trade-page/trading/trades/trades.block";
import {
  SymbolState,
  TradingInfoContext
} from "pages/trades/binance-trade-page/trading/trading-info.context";
import { TradingPriceContextProvider } from "pages/trades/binance-trade-page/trading/trading-price.context";
import { TradingTables } from "pages/trades/binance-trade-page/trading/trading-tables/trading-tables";
import { TradingTickerContextProvider } from "pages/trades/binance-trade-page/trading/trading-ticker.context";
import React, { useContext, useEffect } from "react";

import styles from "./trading.module.scss";

interface Props {
  authData: TradeAuthDataType;
  symbol?: SymbolState;
}

const _TradingContainer: React.FC<Props> = ({ authData, symbol }) => {
  const { setSymbol } = useContext(TradingInfoContext);
  useEffect(() => {
    if (symbol) setSymbol(symbol);
  }, [symbol]);
  return (
    <div className={styles["trading-grid"]}>
      <TradingTickerContextProvider>
        <div className={styles["symbol-summary-grid-elem"]}>
          <ResponsiveContainer enabledScreens={["tablet", "landscape-tablet"]}>
            <SymbolSummarySmallContainer />
          </ResponsiveContainer>
          <ResponsiveContainer enabledScreens={["phone", "landscape-phone"]}>
            <SymbolSummaryContainer />
          </ResponsiveContainer>
        </div>
        <div className={styles["market-watch-grid-elem"]}>
          <ResponsiveContainer enabledScreens={["large-desktop"]}>
            <MarketWatchBlock />
          </ResponsiveContainer>
        </div>
      </TradingTickerContextProvider>
      <div className={styles["chart-grid-elem"]}>
        <ChartBlock />
      </div>
      <div className={styles["tables-grid-elem"]}>
        <TradingTables />
      </div>
      <TradingPriceContextProvider>
        <div className={styles["order-book-grid-elem"]}>
          <ResponsiveContainer
            enabledScreens={[
              "tablet",
              "landscape-tablet",
              "desktop",
              "large-desktop"
            ]}
          >
            <OrderBookBlock />
          </ResponsiveContainer>
        </div>
        <div className={styles["trades-grid-elem"]}>
          <ResponsiveContainer
            enabledScreens={[
              "tablet",
              "landscape-tablet",
              "desktop",
              "large-desktop"
            ]}
          >
            <TradesBlock />
          </ResponsiveContainer>
        </div>
        <div className={styles["place-orders-grid-elem"]}>
          <PlaceOrder />
        </div>
      </TradingPriceContextProvider>
    </div>
  );
};

export const TradingContainer = React.memo(_TradingContainer);

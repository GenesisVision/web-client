import { Center } from "components/center/center";
import { ResponsiveContainer } from "components/responsive-container/responsive-container";
import { ChartBlock } from "pages/trades/binance-trade-page/trading/chart/chart-block";
import { TradeHeaderContainer } from "pages/trades/binance-trade-page/trading/components/trade-header/trade-header";
import { MarginRatioContainer } from "pages/trades/binance-trade-page/trading/margin-ratio/margin-ratio.container";
import { MarketWatchBlock } from "pages/trades/binance-trade-page/trading/market-watch/market-watch.block";
import { OrderBookBlock } from "pages/trades/binance-trade-page/trading/order-book/order-book.block";
import { PlaceOrder } from "pages/trades/binance-trade-page/trading/place-order/place-order";
import { PlaceOrderSettingsContainer } from "pages/trades/binance-trade-page/trading/place-order/place-order-settings/place-order-settings.container";
import { SymbolSummaryContainer } from "pages/trades/binance-trade-page/trading/symbol-summary/symbol-summary";
import { SymbolSummarySmallBlock } from "pages/trades/binance-trade-page/trading/symbol-summary/symbol-summary-small";
import { TradesBlock } from "pages/trades/binance-trade-page/trading/trades/trades.block";
import {
  SymbolState,
  TradingInfoContextProvider
} from "pages/trades/binance-trade-page/trading/trading-info.context";
import { TradingPriceContextProvider } from "pages/trades/binance-trade-page/trading/trading-price.context";
import { TradingTables } from "pages/trades/binance-trade-page/trading/trading-tables/trading-tables";
import { TradingTickerContextProvider } from "pages/trades/binance-trade-page/trading/trading-ticker.context";
import {
  TerminalType,
  TradeAuthDataType
} from "pages/trades/binance-trade-page/trading/trading.types";
import React from "react";

import styles from "./trading.module.scss";

interface Props {
  authData: TradeAuthDataType;
  type?: TerminalType;
  symbol?: SymbolState;
}

const _TradingContainer: React.FC<Props> = ({ authData, type, symbol }) => {
  return (
    <TradingInfoContextProvider
      authData={authData}
      outerSymbol={symbol}
      type={type}
    >
      <div className={styles["trading-grid"]}>
        <TradingTickerContextProvider>
          <Center className={styles["header-grid-elem"]}>
            <TradeHeaderContainer />
          </Center>
          <div className={styles["symbol-summary-grid-elem"]}>
            <ResponsiveContainer
              enabledScreens={["tablet", "landscape-tablet"]}
            >
              <SymbolSummarySmallBlock />
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
          <div className={styles["tables-grid-elem"]}>
            <TradingTables />
          </div>
          <div className={styles["chart-grid-elem"]}>
            <ChartBlock />
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
              {type === "futures" && <PlaceOrderSettingsContainer />}
              <PlaceOrder />
              {type === "futures" && <MarginRatioContainer />}
            </div>
          </TradingPriceContextProvider>
        </TradingTickerContextProvider>
      </div>
    </TradingInfoContextProvider>
  );
};

export const TradingContainer = React.memo(_TradingContainer);

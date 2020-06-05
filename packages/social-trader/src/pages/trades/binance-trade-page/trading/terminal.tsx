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
import {
  SymbolState,
  TerminalInfoContextProvider
} from "pages/trades/binance-trade-page/trading/terminal-info.context";
import { TerminalPlaceOrderContextProvider } from "pages/trades/binance-trade-page/trading/terminal-place-order.context";
import { TerminalTickerContextProvider } from "pages/trades/binance-trade-page/trading/terminal-ticker.context";
import {
  ExchangeInfo,
  TerminalAuthDataType,
  TerminalType
} from "pages/trades/binance-trade-page/trading/terminal.types";
import { TradesBlock } from "pages/trades/binance-trade-page/trading/trades/trades.block";
import { TradingPriceContextProvider } from "pages/trades/binance-trade-page/trading/trading-price.context";
import { TradingTables } from "pages/trades/binance-trade-page/trading/trading-tables/trading-tables";
import React from "react";

import styles from "./terminal.module.scss";

interface Props {
  exchangeInfo: ExchangeInfo;
  authData: TerminalAuthDataType;
  terminalType: TerminalType;
  symbol?: SymbolState;
}

const _Terminal: React.FC<Props> = ({
  exchangeInfo,
  authData,
  symbol,
  terminalType
}) => {
  return (
    <TerminalInfoContextProvider
      exchangeInfo={exchangeInfo}
      authData={authData}
      outerSymbol={symbol}
      terminalType={terminalType}
    >
      <div className={styles["trading-grid"]}>
        <TerminalTickerContextProvider>
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
              <TerminalPlaceOrderContextProvider>
                {terminalType === "futures" && <PlaceOrderSettingsContainer />}
                <PlaceOrder />
                {terminalType === "futures" && <MarginRatioContainer />}
              </TerminalPlaceOrderContextProvider>
            </div>
          </TradingPriceContextProvider>
        </TerminalTickerContextProvider>
      </div>
    </TerminalInfoContextProvider>
  );
};

export const Terminal = React.memo(_Terminal);

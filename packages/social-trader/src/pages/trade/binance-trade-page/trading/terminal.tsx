import { Center } from "components/center/center";
import { ResponsiveContainer } from "components/responsive-container/responsive-container";
import { ChartBlock } from "pages/trade/binance-trade-page/trading/chart/chart-block";
import { TradeHeaderContainer } from "pages/trade/binance-trade-page/trading/components/trade-header/trade-header";
import { MarginRatioBlock } from "pages/trade/binance-trade-page/trading/margin-ratio/margin-ratio.block";
import { MarketWatchBlock } from "pages/trade/binance-trade-page/trading/market-watch/market-watch.block";
import { OrderBookBlock } from "pages/trade/binance-trade-page/trading/order-book/order-book.block";
import { PlaceOrder } from "pages/trade/binance-trade-page/trading/place-order/place-order";
import { PlaceOrderSettingsContainer } from "pages/trade/binance-trade-page/trading/place-order/place-order-settings/place-order-settings.container";
import { SymbolSummaryContainer } from "pages/trade/binance-trade-page/trading/symbol-summary/symbol-summary";
import { SymbolSummarySmallBlock } from "pages/trade/binance-trade-page/trading/symbol-summary/symbol-summary-small";
import {
  SymbolState,
  TerminalInfoContextProvider
} from "pages/trade/binance-trade-page/trading/terminal-info.context";
import { TerminalOpenOrdersContextProvider } from "pages/trade/binance-trade-page/trading/terminal-open-orders.context";
import { TerminalPlaceOrderContextProvider } from "pages/trade/binance-trade-page/trading/terminal-place-order.context";
import { TerminalTickerContextProvider } from "pages/trade/binance-trade-page/trading/terminal-ticker.context";
import {
  ExchangeInfo,
  TerminalAuthDataType,
  TerminalType
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { TradesBlock } from "pages/trade/binance-trade-page/trading/trades/trades.block";
import { TradingPriceContextProvider } from "pages/trade/binance-trade-page/trading/trading-price.context";
import { TradingTables } from "pages/trade/binance-trade-page/trading/trading-tables/trading-tables";
import React from "react";

import { TerminalMobileChartBlock } from "./terminal-mobile-chart-block/terminal-mobile-chart-block";
import styles from "./terminal.module.scss";

interface Props {
  exchangeAccountId?: string;
  exchangeInfo: ExchangeInfo;
  authData?: TerminalAuthDataType;
  terminalType: TerminalType;
  symbol?: SymbolState;
}

const _Terminal: React.FC<Props> = ({
  exchangeAccountId,
  exchangeInfo,
  authData,
  symbol,
  terminalType
}) => {
  return (
    <TerminalInfoContextProvider
      exchangeAccountId={exchangeAccountId}
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
          <TradingPriceContextProvider>
            <div className={styles["chart-grid-elem"]}>
              <ResponsiveContainer
                enabledScreens={["phone", "landscape-phone"]}
              >
                <TerminalMobileChartBlock />
              </ResponsiveContainer>
              <ResponsiveContainer
                enabledScreens={[
                  "tablet",
                  "landscape-tablet",
                  "desktop",
                  "large-desktop"
                ]}
              >
                <ChartBlock />
              </ResponsiveContainer>
            </div>
            <TerminalOpenOrdersContextProvider>
              <div className={styles["tables-grid-elem"]}>
                <TradingTables />
              </div>
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
            </TerminalOpenOrdersContextProvider>
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
                {terminalType === "futures" && <MarginRatioBlock />}
              </TerminalPlaceOrderContextProvider>
            </div>
          </TradingPriceContextProvider>
        </TerminalTickerContextProvider>
      </div>
    </TerminalInfoContextProvider>
  );
};

export const Terminal = React.memo(_Terminal);

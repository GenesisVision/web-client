import classNames from "classnames";
import { Center } from "components/center/center";
import { TradeAuthDataType } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { ChartBlock } from "pages/trades/binance-trade-page/trading/chart/chart-block";
import { MarketWatchBlock } from "pages/trades/binance-trade-page/trading/market-watch/market-watch.block";
import { OrderBookBlock } from "pages/trades/binance-trade-page/trading/order-book/order-book.block";
import { Trade } from "pages/trades/binance-trade-page/trading/trade/trade";
import { TradesBlock } from "pages/trades/binance-trade-page/trading/trades/trades.block";
import {
  SymbolState,
  TradingInfoContext
} from "pages/trades/binance-trade-page/trading/trading-info.context";
import { TradingPriceContextProvider } from "pages/trades/binance-trade-page/trading/trading-price.context";
import { TradingTables } from "pages/trades/binance-trade-page/trading/trading-tables/trading-tables";
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
    <Center className={styles["trading__main-block"]}>
      <div className={styles["trading__left-group"]}>
        <Center className={styles["trading__top-group"]}>
          <MarketWatchBlock />
          <ChartBlock />
        </Center>
        <div className={styles["trading__bottom-group"]}>
          <TradingTables />
        </div>
      </div>
      <div className={styles["trading__right-group"]}>
        <TradingPriceContextProvider>
          <Center className={styles["trading__right-group-item"]}>
            <div
              className={classNames(
                styles["trading__right-group-item"],
                styles["trading__right-list-block"]
              )}
            >
              <div className={styles["trading__top-group"]}>
                <OrderBookBlock />
              </div>
              <div className={styles["trading__bottom-group"]}>
                <TradesBlock />
              </div>
            </div>
            <div className={styles["trading__right-group-item"]}>
              <Trade />
            </div>
          </Center>
        </TradingPriceContextProvider>
      </div>
    </Center>
  );
};

export const TradingContainer = React.memo(_TradingContainer);

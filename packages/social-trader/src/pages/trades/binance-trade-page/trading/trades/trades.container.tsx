import { Trades } from "pages/trades/binance-trade-page/trading/trades/trades";
import { TradingPriceContext } from "pages/trades/binance-trade-page/trading/trading-price.context";
import React, { useContext } from "react";

import styles from "./trades.module.scss";

const _TradesContainer: React.FC = () => {
  const { trades } = useContext(TradingPriceContext);
  return (
    <div className={styles["trades__items-container"]}>
      <Trades items={trades} />
    </div>
  );
};

export const TradesContainer = React.memo(_TradesContainer);

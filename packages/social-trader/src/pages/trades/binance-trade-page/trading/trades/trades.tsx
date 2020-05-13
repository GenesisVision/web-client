import { MutedText } from "components/muted-text/muted-text";
import { TradesRow } from "pages/trades/binance-trade-page/trading/trades/trades-row";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { Trade } from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useContext } from "react";

import styles from "./trades.module.scss";

interface Props {
  items: Trade[];
}

const _Trades: React.FC<Props> = ({ items }) => {
  const {
    symbol: { baseAsset, quoteAsset }
  } = useContext(TradingInfoContext);
  return (
    <div className={styles["trades__container"]}>
      <div className={styles["trades__header-container"]}>
        <table className={styles["trades__table"]}>
          <thead>
            <th>
              <MutedText small>Price ({baseAsset})</MutedText>
            </th>
            <th>
              <MutedText small>Amount ({quoteAsset})</MutedText>
            </th>
            <th>
              <MutedText small>Time</MutedText>
            </th>
          </thead>
        </table>
      </div>
      <div className={styles["trades__items-container"]}>
        <table className={styles["trades__table"]}>
          <tbody>
            {items.map(({ price, qty, time }, i) => (
              <TradesRow
                price={price}
                prevPrice={items[i + 1]?.price}
                amount={qty}
                time={time}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const Trades = React.memo(_Trades);
import { Text } from "components/text/text";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { UnitedTrade } from "pages/trade/binance-trade-page/trading/terminal.types";
import { TradesRow } from "pages/trade/binance-trade-page/trading/trades/trades-row";
import React, { useContext } from "react";

import styles from "./trades.module.scss";

interface Props {
  items: UnitedTrade[];
}

const _Trades: React.FC<Props> = ({ items }) => {
  const {
    stepSize,
    tickSize,
    symbol: { baseAsset, quoteAsset }
  } = useContext(TerminalInfoContext);
  return (
    <div className={styles["trades__container"]}>
      <div className={styles["trades__header-container"]}>
        <table className={styles["trades__table"]}>
          <thead>
            <th>
              <Text muted size={"small"}>
                Price ({quoteAsset})
              </Text>
            </th>
            <th>
              <Text muted size={"small"}>
                Amount ({baseAsset})
              </Text>
            </th>
            <th>
              <Text muted size={"small"}>
                Time
              </Text>
            </th>
          </thead>
        </table>
      </div>
      <div className={styles["trades__items-container"]}>
        <table className={styles["trades__table"]}>
          <tbody>
            {items.map(
              ({ orderId, price, quantity, tradeTime, buyerIsMaker }) => (
                <TradesRow
                  key={orderId}
                  buyerIsMaker={buyerIsMaker}
                  stepSize={stepSize}
                  tickSize={tickSize}
                  price={price}
                  amount={quantity}
                  time={tradeTime}
                />
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const Trades = React.memo(_Trades);

import { Text } from "components/text/text";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { UnitedTrade } from "pages/trade/binance-trade-page/trading/terminal.types";
import { TradesRow } from "pages/trade/binance-trade-page/trading/trades/trades-row";
import React, { useContext } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";

import styles from "./trades.module.scss";

interface Props {
  items: UnitedTrade[];
}

export const Trades: React.FC<Props> = ({ items }) => {
  const {
    stepSize,
    tickSize,
    symbol: { baseAsset, quoteAsset }
  } = useContext(TerminalInfoContext);
  return (
    <div className={styles["trades__container"]}>
      <div className={styles["trades__header-container"]}>
        <span className={styles["trades__cell"]}>
          <Text muted size={"xsmall"}>
            Price ({quoteAsset})
          </Text>
        </span>
        <span className={styles["trades__cell"]}>
          <Text muted size={"xsmall"} wrap={false}>
            Amount ({baseAsset})
          </Text>
        </span>
        <span className={styles["trades__cell"]}>
          <Text muted size={"xsmall"}>
            Time
          </Text>
        </span>
      </div>
      <div className={styles["trades__items-container"]}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemData={items}
              itemCount={items.length}
              itemSize={15}
            >
              {({ style, data, index }) => (
                <div style={style}>
                  <TradesRow
                    buyerIsMaker={data[index].buyerIsMaker}
                    price={data[index].price}
                    amount={data[index].quantity}
                    time={data[index].tradeTime}
                    stepSize={stepSize}
                    tickSize={tickSize}
                  />
                </div>
              )}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};

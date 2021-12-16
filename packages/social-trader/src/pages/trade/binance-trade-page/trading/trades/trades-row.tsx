import { Text } from "components/text/text";
import { terminalMoneyFormat } from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import React from "react";
import NumberFormat from "react-number-format";
import { formatTime } from "utils/dates";

import styles from "./trades.module.scss";

interface Props {
  stepSize?: string;
  tickSize?: string;
  buyerIsMaker: boolean;
  price: number;
  amount: number;
  time: number | Date;
}

export const TradesRow: React.FC<Props> = ({
  stepSize,
  tickSize,
  price,
  amount,
  time,
  buyerIsMaker
}) => {
  const formattedPrice = terminalMoneyFormat({
    amount: price,
    tickSize: tickSize
  });
  const formattedAmount = terminalMoneyFormat({
    amount: amount,
    tickSize: stepSize
  });
  return (
    <div className={styles["trades__row-container"]}>
      <span className={styles["trades__cell"]}>
        <Text size={"xsmall"} color={buyerIsMaker ? "red" : "green"}>
          <NumberFormat
            displayType="text"
            thousandSeparator={","}
            value={formattedPrice}
          />
        </Text>
      </span>
      <span className={styles["trades__cell"]}>{formattedAmount}</span>
      <span className={styles["trades__cell"]}>{formatTime(time)}</span>
    </div>
  );
};

import { Text } from "components/text/text";
import { terminalMoneyFormat } from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import React from "react";
import NumberFormat from "react-number-format";
import { formatTime } from "utils/dates";

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
    <tr>
      <td>
        <Text size={"xsmall"} color={buyerIsMaker ? "red" : "green"}>
          <NumberFormat
            displayType="text"
            thousandSeparator={","}
            value={formattedPrice}
          />
        </Text>
      </td>
      <td>{formattedAmount}</td>
      <td>{formatTime(time)}</td>
    </tr>
  );
};

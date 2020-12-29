import { Text } from "components/text/text";
import { terminalMoneyFormat } from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { getTextColor } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import React from "react";
import NumberFormat from "react-number-format";
import { formatTime } from "utils/dates";

interface Props {
  stepSize?: string;
  tickSize?: string;
  prevPrice?: number;
  price: number;
  amount: number;
  time: number | Date;
}

const _TradesRow: React.FC<Props> = ({
  stepSize,
  tickSize,
  prevPrice,
  price,
  amount,
  time
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
        <Text
          size={"xsmall"}
          color={getTextColor(+price - +(prevPrice ? prevPrice : price))}
        >
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

export const TradesRow = React.memo(_TradesRow);

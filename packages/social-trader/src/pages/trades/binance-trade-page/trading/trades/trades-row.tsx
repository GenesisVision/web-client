import { ColoredText } from "components/colored-text/colored-text";
import { getTextColor } from "pages/trades/binance-trade-page/trading/trading.helpers";
import React from "react";
import { formatTime } from "utils/dates";
import { formatValue } from "utils/formatter";

interface Props {
  prevPrice?: string;
  price: string;
  amount: string;
  time: number;
}

const _TradesRow: React.FC<Props> = ({ prevPrice, price, amount, time }) => {
  return (
    <tr>
      <td>
        <ColoredText
          color={getTextColor(+price - +(prevPrice ? prevPrice : price))}
        >
          {formatValue(price)}
        </ColoredText>
      </td>
      <td>{amount}</td>
      <td>{formatTime(time)}</td>
    </tr>
  );
};

export const TradesRow = React.memo(_TradesRow);

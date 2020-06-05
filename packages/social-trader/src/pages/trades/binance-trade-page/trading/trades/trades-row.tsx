import { Text } from "components/text/text";
import { terminalMoneyFormat } from "pages/trades/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { getTextColor } from "pages/trades/binance-trade-page/trading/terminal.helpers";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import React, { useContext } from "react";
import { formatTime } from "utils/dates";

interface Props {
  prevPrice?: string;
  price: string;
  amount: string;
  time: number;
}

const _TradesRow: React.FC<Props> = ({ prevPrice, price, amount, time }) => {
  const { stepSize, tickSize } = useContext(TradingInfoContext);
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
        <Text color={getTextColor(+price - +(prevPrice ? prevPrice : price))}>
          {formattedPrice}
        </Text>
      </td>
      <td>{formattedAmount}</td>
      <td>{formatTime(time)}</td>
    </tr>
  );
};

export const TradesRow = React.memo(_TradesRow);

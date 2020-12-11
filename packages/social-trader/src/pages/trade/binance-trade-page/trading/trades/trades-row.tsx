import { Text } from "components/text/text";
import { terminalMoneyFormat } from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import { getTextColor } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import React, { useContext } from "react";
import { formatTime } from "utils/dates";

interface Props {
  prevPrice?: number;
  price: number;
  amount: number;
  time: number | Date;
}

const _TradesRow: React.FC<Props> = ({ prevPrice, price, amount, time }) => {
  const { stepSize, tickSize } = useContext(TerminalInfoContext);
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
          {formattedPrice}
        </Text>
      </td>
      <td>{formattedAmount}</td>
      <td>{formatTime(time)}</td>
    </tr>
  );
};

export const TradesRow = React.memo(_TradesRow);

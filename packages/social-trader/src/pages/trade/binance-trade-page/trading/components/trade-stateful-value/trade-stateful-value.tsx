import { Text } from "components/text/text";
import { getTextColor } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";

interface Props {
  showArrow?: boolean;
  thousandSeparator?: string;
  suffix?: string;
  trigger: any;
  value: number | string;
}

const _TradeStatefulValue: React.FC<Props> = ({
  thousandSeparator,
  showArrow,
  suffix,
  value,
  trigger
}) => {
  const [prevLastValue, setPrevLastValue] = useState(value);
  const [currentLastValue, setCurrentLastValue] = useState(value);

  useEffect(() => {
    setPrevLastValue(currentLastValue);
    setCurrentLastValue(value);
  }, [trigger]);

  const color = getTextColor(+value - +prevLastValue);

  return (
    <Text color={color}>
      <NumberFormat
        displayType="text"
        thousandSeparator={thousandSeparator}
        value={value}
        suffix={suffix ? ` ${suffix}` : undefined}
      />
      {showArrow && color === "green" && <>&uarr;</>}
      {showArrow && color === "red" && <>&darr;</>}
    </Text>
  );
};

export const TradeStatefulValue = React.memo(_TradeStatefulValue);

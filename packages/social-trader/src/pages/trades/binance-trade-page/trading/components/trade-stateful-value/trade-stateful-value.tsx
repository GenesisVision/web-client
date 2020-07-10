import { Text } from "components/text/text";
import { getTextColor } from "pages/trades/binance-trade-page/trading/terminal.helpers";
import React, { useEffect, useState } from "react";

interface Props {
  suffix?: string;
  trigger: any;
  value: number | string;
}

const _TradeStatefulValue: React.FC<Props> = ({ suffix, value, trigger }) => {
  const [prevLastValue, setPrevLastValue] = useState(value);
  const [currentLastValue, setCurrentLastValue] = useState(value);
  useEffect(() => {
    setPrevLastValue(currentLastValue);
    setCurrentLastValue(value);
  }, [trigger]);
  return (
    <Text color={getTextColor(+value - +prevLastValue)}>
      {value} {suffix}
    </Text>
  );
};

export const TradeStatefulValue = React.memo(_TradeStatefulValue);

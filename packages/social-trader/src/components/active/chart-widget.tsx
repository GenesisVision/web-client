import React, { useEffect, useState } from "react";
// @ts-ignore
import TradingViewWidget, { Themes } from "react-tradingview-widget";

const _ChartWidget: React.FC<Props> = ({ chartSymbol }) => {
  const [isServer, setIsServer] = useState(typeof window === "undefined");
  useEffect(() => {
    if (typeof window === "undefined") setIsServer(true);
    else setIsServer(false);
  }, [window]);
  return !isServer ? (
    <TradingViewWidget symbol={chartSymbol} autosize theme={Themes.DARK} />
  ) : null;
};

interface Props {
  chartSymbol: string;
}

export const ChartWidget = React.memo(_ChartWidget);

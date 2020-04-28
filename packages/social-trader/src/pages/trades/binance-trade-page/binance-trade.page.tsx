import { BinanceTradeContainer } from "pages/trades/binance-trade-page/binance-trade.container";
import React from "react";
import { useTranslation } from "react-i18next";

import "../trades.scss";

export const BinanceTrade: React.FC = () => {
  const [t] = useTranslation();
  return <BinanceTradeContainer />;
};

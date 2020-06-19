import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import React, { useContext } from "react";

import { Funds } from "./funds";

export const FundsContainer: React.FC = () => {
  const { accountInfo } = useContext(TradingInfoContext);
  const items = accountInfo ? accountInfo.balances : [];
  return <Funds items={items} />;
};

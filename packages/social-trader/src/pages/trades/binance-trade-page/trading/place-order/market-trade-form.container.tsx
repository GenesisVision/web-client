import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import React, { useContext } from "react";

import { IMarketTradeFormProps, MarketTradeForm } from "./market-trade-form";

const _MarketTradeFormContainer: React.FC<IMarketTradeFormProps> = props => {
  const { exchangeInfo, accountInfo } = useContext(TradingInfoContext);
  if (!exchangeInfo || !accountInfo) return null;
  return (
    <MarketTradeForm
      {...props}
      exchangeInfo={exchangeInfo}
      accountInfo={accountInfo}
    />
  );
};

export const MarketTradeFormContainer = React.memo(_MarketTradeFormContainer);

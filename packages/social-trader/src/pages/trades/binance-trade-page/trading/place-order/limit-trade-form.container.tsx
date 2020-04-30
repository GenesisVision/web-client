import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import React, { useContext } from "react";

import { ILimitTradeFormProps, LimitTradeForm } from "./limit-trade-form";

const _LimitTradeFormContainer: React.FC<ILimitTradeFormProps> = props => {
  const { exchangeInfo, accountInfo } = useContext(TradingInfoContext);
  if (!exchangeInfo || !accountInfo) return null;
  return (
    <LimitTradeForm
      {...props}
      exchangeInfo={exchangeInfo}
      accountInfo={accountInfo}
    />
  );
};

export const LimitTradeFormContainer = React.memo(_LimitTradeFormContainer);

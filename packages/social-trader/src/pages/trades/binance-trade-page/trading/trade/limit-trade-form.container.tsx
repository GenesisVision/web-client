import {
  ILimitTradeFormProps,
  LimitTradeForm
} from "pages/trades/binance-trade-page/trading/trade/limit-trade-form";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import React, { useContext } from "react";

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

import {
  getMarginInfo,
  MARGIN_INFO_ASSET
} from "pages/trades/binance-trade-page/trading/margin-ratio/margin-ratio.helpers";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import React, { useContext } from "react";

import { MarginRatio } from "./margin-ratio";

export const MarginRatioContainer: React.FC = () => {
  const { accountInfo } = useContext(TradingInfoContext);
  if (!accountInfo?.balances) return null;

  const marginInfo = getMarginInfo(accountInfo.balances, MARGIN_INFO_ASSET);

  return <MarginRatio marginInfo={marginInfo} />;
};

import {
  getMarginInfo,
  getMarginRatioLoaderData,
  MARGIN_INFO_ASSET
} from "pages/trade/binance-trade-page/trading/margin-ratio/margin-ratio.helpers";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import React, { useContext } from "react";

import { MarginRatio } from "./margin-ratio";

export const MarginRatioContainer: React.FC = () => {
  const { accountInfo } = useContext(TerminalInfoContext);
  if (!accountInfo?.balances) return null;

  const marginInfo = getMarginInfo(accountInfo.balances, MARGIN_INFO_ASSET);
  return (
    <MarginRatio loaderData={getMarginRatioLoaderData()} data={marginInfo} />
  );
};

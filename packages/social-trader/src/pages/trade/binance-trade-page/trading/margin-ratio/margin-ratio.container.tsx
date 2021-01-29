import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import {
  getMarginInfo,
  MARGIN_INFO_ASSET
} from "pages/trade/binance-trade-page/trading/margin-ratio/margin-ratio.helpers";
import React, { useContext } from "react";

import { MarginRatio } from "./margin-ratio";

export const MarginRatioContainer: React.FC = () => {
  const { accountInfo } = useContext(TerminalInfoContext);
  if (!accountInfo?.balances) return null;

  const marginInfo = getMarginInfo(accountInfo.balances, MARGIN_INFO_ASSET);

  if (
    marginInfo?.maintMargin === undefined ||
    marginInfo?.marginBalance === undefined
  )
    return null;
  return (
    <MarginRatio
      maintMargin={marginInfo.maintMargin}
      marginBalance={marginInfo.marginBalance}
    />
  );
};

import React, { useContext } from "react";

import { TerminalFuturesBalanceContext } from "../contexts/terminal-futures-balance.context";
import { MarginRatioView } from "./margin-ratio-view";

const _CrossMarginRatio: React.FC = () => {
  const { crossPositionInfo } = useContext(TerminalFuturesBalanceContext);

  return (
    <MarginRatioView
      maintMargin={crossPositionInfo ? crossPositionInfo.crossMaintMargin : 0}
      marginBalance={
        crossPositionInfo ? crossPositionInfo.crossMarginBalance : 0
      }
      marginRatio={crossPositionInfo ? crossPositionInfo?.crossMarginRatio : 0}
    />
  );
};

export const CrossMarginRatio = React.memo(_CrossMarginRatio);

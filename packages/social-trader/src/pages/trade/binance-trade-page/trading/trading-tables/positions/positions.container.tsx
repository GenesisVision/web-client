import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import React, { useContext, useMemo } from "react";

import { Positions } from "./positions";

export const PositionsContainer: React.FC = () => {
  const { accountInfo } = useContext(TerminalInfoContext);

  const list = useMemo(
    () =>
      accountInfo?.positions
        ? accountInfo.positions.filter(
            ({ positionAmount }) => positionAmount !== 0
          )
        : [],
    [accountInfo?.positions]
  );

  return <Positions items={list} />;
};

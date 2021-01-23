import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import React, { useContext, useMemo } from "react";

import { Positions } from "./positions";
import { mapBinanceRawFuturesAccountPositionToFuturesPositionInformation } from "./positions.helpers";

export const PositionsContainer: React.FC = () => {
  const { accountInfo } = useContext(TerminalInfoContext);

  const {
    symbol: { baseAsset, quoteAsset }
  } = useContext(TerminalInfoContext);

  const list = useMemo(
    () =>
      accountInfo?.positions
        ? accountInfo.positions
            // .filter(({ symbol }) => symbol === getSymbol(baseAsset, quoteAsset))
            .filter(({ positionAmount }) => positionAmount !== 0)
            .map(
              mapBinanceRawFuturesAccountPositionToFuturesPositionInformation
            )
        : [],
    [accountInfo?.positions]
  );

  return <Positions items={list} />;
};

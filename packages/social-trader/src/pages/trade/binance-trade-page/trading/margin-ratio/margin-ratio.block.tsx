import { TerminalDefaultBlock } from "pages/trade/binance-trade-page/trading/components/terminal-default-block/terminal-default-block";
import { MarginRatioContainer } from "pages/trade/binance-trade-page/trading/margin-ratio/margin-ratio.container";
import React from "react";

export const MarginRatioBlock: React.FC = () => {
  return (
    <TerminalDefaultBlock>
      <MarginRatioContainer />
    </TerminalDefaultBlock>
  );
};

import { TerminalDefaultBlock } from "pages/trade/binance-trade-page/trading/components/terminal-default-block/terminal-default-block";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import React, { useContext } from "react";

import styles from "./trading-tables.module.scss";
import { TradingTablesFutures } from "./trading-tables-futures";
import { TradingTablesSpot } from "./trading-tables-spot";

const _TradingTablesContainer: React.FC = () => {
  const { terminalType } = useContext(TerminalInfoContext);
  const isFutures = terminalType === "futures";

  return (
    <TerminalDefaultBlock
      horizontalOffsets={false}
      className={styles["trading-tables"]}
    >
      {isFutures ? <TradingTablesFutures /> : <TradingTablesSpot />}
    </TerminalDefaultBlock>
  );
};

export const TradingTablesContainer = React.memo(_TradingTablesContainer);

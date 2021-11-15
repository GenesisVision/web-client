import React, { useContext } from "react";

import { TerminalFuturesPositionsContext } from "../../contexts/terminal-futures-positions.context";
import { withTradingTable } from "../with-trading-table";
import { Positions } from "./positions";

const PositionsContainer: React.FC = () => {
  const { openPositions } = useContext(TerminalFuturesPositionsContext);

  return <Positions items={openPositions} />;
};

export default withTradingTable(PositionsContainer);

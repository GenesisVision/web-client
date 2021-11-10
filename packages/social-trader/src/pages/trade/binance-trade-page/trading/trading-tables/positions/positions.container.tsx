import React, { useContext } from "react";

import { TerminalFuturesPositionsContext } from "../../contexts/terminal-futures-positions.context";
import { Positions } from "./positions";

export const PositionsContainer: React.FC = () => {
  const { openPositions } = useContext(TerminalFuturesPositionsContext);

  return <Positions items={openPositions} />;
};

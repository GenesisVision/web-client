import React, { useContext, useMemo } from "react";

import { TerminalFuturesContext } from "../../contexts/terminal-futures.context";
import { Positions } from "./positions";

export const PositionsContainer: React.FC = () => {
  const { openPositions } = useContext(TerminalFuturesContext);

  // const list = useMemo(
  //   () =>
  //     openPositions
  //       ? openPositions.filter(({ quantity }) => quantity !== 0)
  //       : [],
  //   [openPositions]
  // );

  return <Positions items={openPositions} />;
};

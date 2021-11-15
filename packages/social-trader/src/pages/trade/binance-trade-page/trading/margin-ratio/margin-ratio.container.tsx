import React, { useContext, useEffect, useState } from "react";

import { TerminalFuturesPositionsContext } from "../contexts/terminal-futures-positions.context";
import { TerminalInfoContext } from "../contexts/terminal-info.context";
import { getSymbolFromState } from "../terminal.helpers";
import { Position } from "../terminal.types";
import { CrossMarginRatio } from "./cross-margin-ratio";
import { IsolatedMarginRatio } from "./isolated-margin-ratio";
import { MarginRatioView } from "./margin-ratio-view";
import SelectPosition from "./select-position";

export const MarginRatioContainer: React.FC = () => {
  const { symbol: currentSymbol } = useContext(TerminalInfoContext);
  const { openPositions } = useContext(TerminalFuturesPositionsContext);

  const [selectedPosition, setSelectionPosition] = useState<
    Position | undefined
  >();

  useEffect(() => {
    if (!openPositions.length) {
      setSelectionPosition(undefined);
      return;
    }
    const currentSymbolPosition = openPositions.find(
      ({ symbol, marginType }) =>
        symbol === getSymbolFromState(currentSymbol) || marginType === "Cross"
    );
    if (currentSymbolPosition) {
      setSelectionPosition(currentSymbolPosition);
      return;
    }
    setSelectionPosition(openPositions[0]);
  }, [openPositions.length, currentSymbol]);

  if (!selectedPosition) {
    return (
      <MarginRatioView maintMargin={0} marginBalance={0} marginRatio={0} />
    );
  }

  return (
    <>
      <SelectPosition
        positions={openPositions}
        selectedPositon={selectedPosition}
        setSelectionPosition={setSelectionPosition}
      />
      {selectedPosition.marginType === "Cross" ? (
        <CrossMarginRatio />
      ) : (
        <IsolatedMarginRatio position={selectedPosition} />
      )}
    </>
  );
};

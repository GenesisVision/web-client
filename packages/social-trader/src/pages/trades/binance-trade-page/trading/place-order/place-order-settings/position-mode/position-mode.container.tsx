import useApiRequest from "hooks/api-request.hook";
import { PositionMode } from "pages/trades/binance-trade-page/trading/place-order/place-order-settings/position-mode/position-mode";
import { TerminalMethodsContext } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { PositionModeType } from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useCallback, useContext, useEffect, useState } from "react";

const _PositionModeContainer: React.FC = () => {
  const { changePositionMode, getPositionMode } = useContext(
    TerminalMethodsContext
  );
  const { authData, symbol } = useContext(TradingInfoContext);
  const { sendRequest: changePosition } = useApiRequest({
    request: changePositionMode!
  });
  const { data: currentPositionMode } = useApiRequest({
    request: getPositionMode!,
    fetchOnMount: true,
    fetchOnMountData: { authData }
  });
  const [mode, setMode] = useState<PositionModeType | undefined>(undefined);

  useEffect(() => {
    if (currentPositionMode?.dualSidePosition !== undefined)
      setMode(currentPositionMode?.dualSidePosition);
  }, [currentPositionMode]);

  const handleOnChange = useCallback(
    (dualSidePosition: PositionModeType) => {
      changePosition({
        authData,
        dualSidePosition
      }).then(() => {
        setMode(dualSidePosition);
      });
    },
    [symbol, authData]
  );
  return (
    <PositionMode
      loaderData={false}
      data={mode as PositionModeType}
      onChange={handleOnChange}
    />
  );
};

export const PositionModeContainer = React.memo(_PositionModeContainer);

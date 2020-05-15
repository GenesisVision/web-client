import useApiRequest from "hooks/api-request.hook";
import { MarginMode } from "pages/trades/binance-trade-page/trading/place-order/place-order-settings/margin-mode/margin-mode";
import { TerminalMethodsContext } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import {
  getSymbolFromState,
  useTradeAuth
} from "pages/trades/binance-trade-page/trading/trading.helpers";
import { MarginModeType } from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useCallback, useContext, useState } from "react";

const _MarginModeContainer: React.FC = () => {
  const { changeMarginMode } = useContext(TerminalMethodsContext);
  const { authData } = useTradeAuth();
  const { symbol } = useContext(TradingInfoContext);
  const { sendRequest } = useApiRequest({ request: changeMarginMode! });
  const [mode, setMode] = useState<MarginModeType>("CROSSED");
  const handleOnChange = useCallback(
    (mode: MarginModeType) => {
      sendRequest({ symbol: getSymbolFromState(symbol), authData, mode }).then(
        () => {
          setMode(mode);
        }
      );
    },
    [symbol, authData]
  );
  return <MarginMode mode={mode} onChange={handleOnChange} />;
};

export const MarginModeContainer = React.memo(_MarginModeContainer);

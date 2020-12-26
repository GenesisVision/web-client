import useApiRequest from "hooks/api-request.hook";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import { MarginMode } from "pages/trade/binance-trade-page/trading/place-order/place-order-settings/margin-mode/margin-mode";
import { getSymbolFromState } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { MarginModeType } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useCallback, useContext, useState } from "react";

const _MarginModeContainer: React.FC = () => {
  const { changeMarginMode } = useContext(TerminalMethodsContext);
  const { exchangeAccountId, symbol } = useContext(TerminalInfoContext);
  const { sendRequest } = useApiRequest({ request: changeMarginMode! });
  const [mode, setMode] = useState<MarginModeType>("Cross");
  const handleOnChange = useCallback(
    (mode: MarginModeType) => {
      sendRequest({
        symbol: getSymbolFromState(symbol),
        accountId: exchangeAccountId,
        marginType: mode
      }).then(() => {
        setMode(mode);
      });
    },
    [symbol, exchangeAccountId]
  );
  return <MarginMode mode={mode} onChange={handleOnChange} />;
};

export const MarginModeContainer = React.memo(_MarginModeContainer);

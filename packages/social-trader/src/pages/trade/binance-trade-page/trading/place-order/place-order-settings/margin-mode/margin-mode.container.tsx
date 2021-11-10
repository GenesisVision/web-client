import useApiRequest from "hooks/api-request.hook";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import { MarginMode } from "pages/trade/binance-trade-page/trading/place-order/place-order-settings/margin-mode/margin-mode";
import { getSymbolFromState } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { MarginModeType } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useCallback, useContext } from "react";

import { TerminalFuturesPositionsContext } from "../../../contexts/terminal-futures-positions.context";
import { TerminalPlaceOrderContext } from "../../../contexts/terminal-place-order.context";

const _MarginModeContainer: React.FC = () => {
  const { changeMarginMode } = useContext(TerminalMethodsContext);
  const { marginMode, setMarginMode } = useContext(TerminalPlaceOrderContext);
  const { exchangeAccountId, symbol } = useContext(TerminalInfoContext);
  const { updateSymbolPosition } = useContext(TerminalFuturesPositionsContext);
  const { sendRequest } = useApiRequest({ request: changeMarginMode! });
  const handleOnChange = useCallback(
    (mode: MarginModeType) => {
      sendRequest({
        symbol: getSymbolFromState(symbol),
        accountId: exchangeAccountId,
        marginType: mode
      }).then(() => {
        setMarginMode(mode);
        updateSymbolPosition();
      });
    },
    [symbol, exchangeAccountId]
  );
  return <MarginMode mode={marginMode!} onChange={handleOnChange} />;
};

export const MarginModeContainer = React.memo(_MarginModeContainer);

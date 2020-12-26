import useApiRequest from "hooks/api-request.hook";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import { TerminalPlaceOrderContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-place-order.context";
import { ChangeLeverage } from "pages/trade/binance-trade-page/trading/place-order/place-order-settings/change-leverage/change-leverage";
import { getSymbolFromState } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { ChangeLeverageResponse } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useCallback, useContext, useEffect } from "react";
import { safeGetElemFromArray } from "utils/helpers";

const _ChangeLeverageContainer: React.FC = () => {
  const {
    changeLeverage: changeLeverageMethod,
    getLeverageBrackets: getLeverageBracketsMethod
  } = useContext(TerminalMethodsContext);
  const { exchangeAccountId, symbol } = useContext(TerminalInfoContext);
  const { leverage, setLeverage } = useContext(TerminalPlaceOrderContext);

  const {
    sendRequest: getLeverageBrackets,
    data: leverageBrackets
  } = useApiRequest({
    request: getLeverageBracketsMethod!
  });
  const { sendRequest: changeLeverage } = useApiRequest({
    middleware: [
      ({ leverage }: ChangeLeverageResponse) => setLeverage(leverage)
    ],
    request: changeLeverageMethod!
  });

  useEffect(() => {
    if (exchangeAccountId)
      getLeverageBrackets({
        accountId: exchangeAccountId,
        symbol: getSymbolFromState(symbol)
      });
  }, [exchangeAccountId, symbol]);

  const handleOnChange = useCallback(
    (leverage: number) => {
      changeLeverage({
        symbol: getSymbolFromState(symbol),
        accountId: exchangeAccountId,
        leverage
      });
    },
    [symbol, exchangeAccountId]
  );

  const symbolBrackets = leverageBrackets
    ? safeGetElemFromArray(
        leverageBrackets,
        brackets => brackets.symbol === getSymbolFromState(symbol)
      ).brackets.sort((a, b) => {
        return b.initialLeverage - a.initialLeverage;
      })
    : undefined;

  if (!symbolBrackets) return null;

  const maxLeverage = symbolBrackets[0].initialLeverage;

  return (
    <ChangeLeverage
      leverageBrackets={symbolBrackets}
      maxLeverage={maxLeverage}
      leverage={leverage}
      onChange={handleOnChange}
    />
  );
};

export const ChangeLeverageContainer = React.memo(_ChangeLeverageContainer);

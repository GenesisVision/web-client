import useApiRequest from "hooks/api-request.hook";
import { ChangeLeverage } from "pages/trades/binance-trade-page/trading/place-order/place-order-settings/change-leverage/change-leverage";
import { TerminalMethodsContext } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import {
  getSymbolFromState,
  useTradeAuth
} from "pages/trades/binance-trade-page/trading/trading.helpers";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { safeGetElemFromArray } from "utils/helpers";

const _ChangeLeverageContainer: React.FC = () => {
  const {
    changeLeverage: changeLeverageMethod,
    getLeverageBrackets: getLeverageBracketsMethod
  } = useContext(TerminalMethodsContext);
  const { authData } = useTradeAuth();
  const { symbol } = useContext(TradingInfoContext);
  const [leverage, setLeverage] = useState<number>(20);

  const {
    sendRequest: getLeverageBrackets,
    data: leverageBrackets
  } = useApiRequest({
    request: getLeverageBracketsMethod!
  });
  const { sendRequest: changeLeverage } = useApiRequest({
    request: changeLeverageMethod!
  });

  useEffect(() => {
    if (authData.privateKey)
      getLeverageBrackets({ authData, symbol: getSymbolFromState(symbol) });
  }, [authData]);

  const handleOnChange = useCallback(
    (leverage: number) => {
      changeLeverage({
        symbol: getSymbolFromState(symbol),
        authData,
        leverage
      }).then(() => {
        setLeverage(leverage);
      });
    },
    [symbol, authData]
  );

  const maxLeverage = leverageBrackets
    ? safeGetElemFromArray(
        leverageBrackets,
        brackets => brackets.symbol === getSymbolFromState(symbol)
      ).brackets[0].initialLeverage
    : 100;
  return (
    <ChangeLeverage
      maxLeverage={maxLeverage}
      leverage={leverage}
      onChange={handleOnChange}
    />
  );
};

export const ChangeLeverageContainer = React.memo(_ChangeLeverageContainer);

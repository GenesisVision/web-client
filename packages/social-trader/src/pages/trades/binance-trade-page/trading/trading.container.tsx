import useApiRequest from "hooks/api-request.hook";
import { Terminal } from "pages/trades/binance-trade-page/trading/terminal";
import { TerminalMethodsContext } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import {
  SymbolInitialState,
  SymbolState,
  TerminalTypeInitialState
} from "pages/trades/binance-trade-page/trading/trading-info.context";
import {
  getSymbolFromState,
  stringifySymbolFromToParam,
  updateTerminalUrl
} from "pages/trades/binance-trade-page/trading/trading.helpers";
import {
  ExchangeInfo,
  TerminalType,
  TradeAuthDataType
} from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { TERMINAL_ROUTE } from "routes/trade.routes";

interface Props {
  authData: TradeAuthDataType;
  type?: TerminalType;
  symbol?: SymbolState;
}

const _TradingContainer: React.FC<Props> = ({ authData, type, symbol }) => {
  const { getExchangeInfo } = useContext(TerminalMethodsContext);

  const [innerType, setInnerType] = useState<TerminalType | undefined>();
  const [isSymbolCorrect, setIsSymbolCorrect] = useState<boolean | undefined>();
  const [exchangeInfo, setExchangeInfo] = useState<ExchangeInfo | undefined>();

  const { sendRequest } = useApiRequest<ExchangeInfo>({
    request: getExchangeInfo
  });

  useEffect(() => {
    setExchangeInfo(undefined);
    setIsSymbolCorrect(undefined);
    setInnerType(undefined);
  }, [type]);

  useEffect(() => {
    if (exchangeInfo) {
      const isSymbolCorrect =
        !!symbol &&
        !!exchangeInfo.symbols.find(
          item => item.symbol === getSymbolFromState(symbol)
        );
      setIsSymbolCorrect(isSymbolCorrect);
    } else {
      sendRequest()
        .then(setExchangeInfo)
        .then(() => setInnerType(type || TerminalTypeInitialState));
    }
  }, [symbol, exchangeInfo]);

  useEffect(() => {
    if (isSymbolCorrect === false) {
      const route = `${TERMINAL_ROUTE}/${stringifySymbolFromToParam(
        SymbolInitialState
      )}`;
      updateTerminalUrl(route);
    }
  }, [isSymbolCorrect]);

  const exchangeInfoProp = useMemo(() => exchangeInfo, [
    exchangeInfo?.serverTime
  ]);
  const authDataProp = useMemo(() => authData, [
    authData.publicKey,
    authData.privateKey
  ]);
  const symbolProp = useMemo(() => symbol, [
    symbol?.quoteAsset,
    symbol?.baseAsset
  ]);

  if (!exchangeInfoProp || !isSymbolCorrect || !innerType) return null;

  return (
    <Terminal
      exchangeInfo={exchangeInfoProp}
      authData={authDataProp}
      symbol={symbolProp}
      terminalType={innerType}
    />
  );
};

export const TradingContainer = React.memo(_TradingContainer);

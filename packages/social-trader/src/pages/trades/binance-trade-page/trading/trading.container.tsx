import useApiRequest from "hooks/api-request.hook";
import { Terminal } from "pages/trades/binance-trade-page/trading/terminal";
import { TerminalMethodsContext } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import {
  ExchangeInfo,
  TerminalType,
  TradeAuthDataType
} from "pages/trades/binance-trade-page/trading/terminal.types";
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
import React, { useContext, useEffect, useMemo, useState } from "react";
import { TERMINAL_ROUTE } from "routes/trade.routes";

interface Props {
  authData: TradeAuthDataType;
  type?: TerminalType;
  symbol?: SymbolState;
}

interface ITerminalPropsData {
  exchangeInfo?: ExchangeInfo;
  authData?: TradeAuthDataType;
  terminalType?: TerminalType;
  symbol?: SymbolState;
}

const _TradingContainer: React.FC<Props> = ({
  authData,
  type = TerminalTypeInitialState,
  symbol
}) => {
  const { getExchangeInfo } = useContext(TerminalMethodsContext);

  const [isSymbolCorrect, setIsSymbolCorrect] = useState<boolean | undefined>();
  const [exchangeInfo, setExchangeInfo] = useState<ExchangeInfo | undefined>();

  const [checkInfo, setCheckInfo] = useState(false);
  const [updateExchangeInfo, setUpdateExchangeInfo] = useState(false);
  const [terminalPropsData, setTerminalPropsData] = useState<
    ITerminalPropsData
  >({});

  const { sendRequest } = useApiRequest<ExchangeInfo>({
    request: getExchangeInfo
  });

  useEffect(() => {
    setCheckInfo(true);
  }, [type, symbol]);

  useEffect(() => {
    if (checkInfo) setUpdateExchangeInfo(true);
    else setIsSymbolCorrect(undefined);
  }, [checkInfo]);

  useEffect(() => {
    if (updateExchangeInfo) sendRequest().then(setExchangeInfo);
  }, [updateExchangeInfo]);

  useEffect(() => {
    if (!updateExchangeInfo || !exchangeInfo) return;
    const isSymbolCorrect =
      !!symbol &&
      !!exchangeInfo.symbols.find(
        item => item.symbol === getSymbolFromState(symbol)
      );
    setIsSymbolCorrect(isSymbolCorrect);
    setUpdateExchangeInfo(false);
  }, [exchangeInfo]);

  useEffect(() => {
    if (isSymbolCorrect === false) {
      const route = `${TERMINAL_ROUTE}/${stringifySymbolFromToParam(
        SymbolInitialState
      )}`;
      updateTerminalUrl(route);
      setCheckInfo(false);
    } else if (isSymbolCorrect === true) {
      if (exchangeInfo) {
        setTerminalPropsData({
          authData,
          symbol,
          exchangeInfo,
          terminalType: type
        });
        setCheckInfo(false);
      }
    }
  }, [isSymbolCorrect, exchangeInfo]);

  const exchangeInfoProp = useMemo(() => terminalPropsData.exchangeInfo, [
    terminalPropsData
  ]);
  const authDataProp = useMemo(() => terminalPropsData.authData, [
    terminalPropsData
  ]);
  const symbolProp = useMemo(() => terminalPropsData.symbol, [
    terminalPropsData
  ]);
  const terminalTypeProp = useMemo(() => terminalPropsData.terminalType, [
    terminalPropsData
  ]);

  if (!authDataProp || !exchangeInfoProp || !terminalTypeProp) return null;

  return (
    <Terminal
      exchangeInfo={exchangeInfoProp}
      authData={authDataProp}
      symbol={symbolProp}
      terminalType={terminalTypeProp}
    />
  );
};

export const TradingContainer = React.memo(_TradingContainer);

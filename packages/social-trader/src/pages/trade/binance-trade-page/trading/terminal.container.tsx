import { BinanceRawSymbol } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import {
  SymbolInitialState,
  TerminalTypeInitialState
} from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import { Terminal } from "pages/trade/binance-trade-page/trading/terminal";
import {
  stringifySymbolFromToParam,
  updateTerminalUrl
} from "pages/trade/binance-trade-page/trading/terminal.helpers";
import {
  ExchangeInfo,
  SymbolState,
  TerminalType
} from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext, useEffect, useMemo, useState } from "react";

export interface ITerminalContainerProps {
  exchangeAccountId?: string;
  type?: TerminalType;
  symbol?: SymbolState;
}

interface ITerminalPropsData {
  exchangeInfo?: ExchangeInfo;
  terminalType?: TerminalType;
  symbol?: SymbolState;
}

const _TerminalContainer: React.FC<ITerminalContainerProps> = ({
  exchangeAccountId,
  type = TerminalTypeInitialState,
  symbol
}) => {
  const { getExchangeInfo } = useContext(TerminalMethodsContext);

  const [isSymbolCorrect, setIsSymbolCorrect] = useState<boolean | undefined>();

  const [checkInfo, setCheckInfo] = useState(false);
  const [updateExchangeInfo, setUpdateExchangeInfo] = useState(false);
  const [
    terminalPropsData,
    setTerminalPropsData
  ] = useState<ITerminalPropsData>({});

  const { sendRequest, data: exchangeInfo } = useApiRequest<ExchangeInfo>({
    cache: true,
    name: "getExchangeInfo",
    request: getExchangeInfo
  });

  useEffect(() => {
    setCheckInfo(true);
  }, [type, symbol, exchangeAccountId]);

  useEffect(() => {
    if (checkInfo) setUpdateExchangeInfo(true);
    else setIsSymbolCorrect(undefined);
  }, [checkInfo]);

  useEffect(() => {
    if (updateExchangeInfo) sendRequest();
  }, [updateExchangeInfo]);

  useEffect(() => {
    if (!updateExchangeInfo || !exchangeInfo) return;
    const isSymbolCorrect =
      !!symbol &&
      !!exchangeInfo.symbols.find(
        (item: BinanceRawSymbol) =>
          item.quoteAsset === symbol.quoteAsset &&
          item.baseAsset === symbol.baseAsset
      );
    setIsSymbolCorrect(isSymbolCorrect);
    setUpdateExchangeInfo(false);
  }, [exchangeInfo]);

  useEffect(() => {
    if (isSymbolCorrect === false) {
      const route = stringifySymbolFromToParam(SymbolInitialState);
      updateTerminalUrl(route);
      setCheckInfo(false);
    } else if (isSymbolCorrect === true) {
      if (exchangeInfo) {
        setTerminalPropsData({
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
  const symbolProp = useMemo(() => terminalPropsData.symbol, [
    terminalPropsData
  ]);
  const terminalTypeProp = useMemo(() => terminalPropsData.terminalType, [
    terminalPropsData
  ]);

  if (!exchangeInfoProp || !terminalTypeProp) return null;

  return (
    <Terminal
      key={exchangeAccountId}
      exchangeAccountId={exchangeAccountId}
      exchangeInfo={exchangeInfoProp}
      symbol={symbolProp}
      terminalType={terminalTypeProp}
    />
  );
};

export const TerminalContainer = React.memo(_TerminalContainer);

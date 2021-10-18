import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import {
  formatValueWithTick,
  getSymbol
} from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { UnitedTrade } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { useSockets } from "services/websocket.service";

type TradingPriceState = {
  trades: UnitedTrade[];
  setPrice: (price: string) => void;
  price: string;
  bestAskPrice?: number;
  bestBidPrice?: number;
  setBestAskPrice?: (value: number) => void;
  setBestBidPrice?: (value: number) => void;
};

const PriceInitialState: string = "0";

export const TradingAccountInfoInitialState: TradingPriceState = {
  trades: [],
  setPrice: () => {},
  price: PriceInitialState
};

export const TradingPriceContext = createContext<TradingPriceState>(
  TradingAccountInfoInitialState
);

export const TradingPriceContextProvider: React.FC = ({ children }) => {
  const TRADE_LIST_SIZE = 50;
  const { tradeSocket, getTrades } = useContext(TerminalMethodsContext);
  const {
    tickSize,
    terminalType,
    symbol: { baseAsset, quoteAsset }
  } = useContext(TerminalInfoContext);

  const { connectSocket } = useSockets();
  const [price, setPrice] = useState<string>(PriceInitialState);
  const [bestAskPrice, setBestAskPrice] = useState<number | undefined>();
  const [bestBidPrice, setBestBidPrice] = useState<number | undefined>();
  const [list, setList] = useState<UnitedTrade[]>([]);
  const [socketData, setSocketData] = useState<UnitedTrade | undefined>();
  const [socketDataBuffer, setSocketDataBuffer] = useState<UnitedTrade[]>([]);

  useEffect(() => {
    if (!price) setPrice(PriceInitialState);
    setList([]);
    setSocketData(undefined);
    const symbol = getSymbol(baseAsset, quoteAsset);
    const socket = tradeSocket(connectSocket, symbol);
    socket.subscribe(data => {
      setSocketData(data);
    });
    const trade = getTrades(symbol);
    trade.subscribe(data => {
      const updatedData = [...socketDataBuffer, ...data.reverse()];
      setList(updatedData);
      setSocketDataBuffer([]);
    });
  }, [terminalType, baseAsset, quoteAsset]);

  useEffect(() => {
    if (!socketData && !list) return;
    if (!list && socketData) {
      setSocketDataBuffer([socketData, ...socketDataBuffer]);
    }
    if (list && socketData) {
      const newList = [socketData, ...list].slice(0, TRADE_LIST_SIZE);
      setList(newList);
    }
  }, [socketData]);

  useEffect(() => {
    if (list[0]) setPrice(String(list[0].price));
  }, [baseAsset, quoteAsset, list.length === 0]);

  const value = useMemo(
    () => ({
      trades: list,
      setPrice,
      price: formatValueWithTick(price, tickSize),
      bestBidPrice,
      bestAskPrice,
      setBestBidPrice,
      setBestAskPrice
    }),
    [setPrice, price, list, tickSize, bestBidPrice, bestAskPrice]
  );

  return (
    <TradingPriceContext.Provider value={value}>
      {children}
    </TradingPriceContext.Provider>
  );
};

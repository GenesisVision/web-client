import { getBinanceTrades } from "pages/trades/binance-trade-page/trading/services/binance-http.service";
import { tradeSocket } from "pages/trades/binance-trade-page/trading/services/binance-ws.service";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { getSymbol } from "pages/trades/binance-trade-page/trading/trading.helpers";
import { Trade } from "pages/trades/binance-trade-page/trading/trading.types";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { useSockets } from "services/websocket.service";

type TradingPriceState = {
  trades: Trade[];
  setPrice: (price: string) => void;
  price: string;
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
  const {
    symbol: { baseAsset, quoteAsset }
  } = useContext(TradingInfoContext);

  const { connectSocket } = useSockets();
  const [price, setPrice] = useState<string>(PriceInitialState);
  const [list, setList] = useState<Trade[]>([]);
  const [socketData, setSocketData] = useState<Trade | undefined>();
  const [socketDataBuffer, setSocketDataBuffer] = useState<Trade[]>([]);

  useEffect(() => {
    setList([]);
    setSocketData(undefined);
    const symbol = getSymbol(baseAsset, quoteAsset);
    const socket = tradeSocket(connectSocket, symbol);
    socket.subscribe(data => {
      setSocketData(data);
    });
    const trade = getBinanceTrades(symbol);
    trade.subscribe(data => {
      const updatedData = [...socketDataBuffer, ...data];
      setList(updatedData);
      setSocketDataBuffer([]);
    });
  }, [baseAsset, quoteAsset]);

  useEffect(() => {
    if (!socketData && !list) return;
    if (!list && socketData) {
      setSocketDataBuffer([socketData, ...socketDataBuffer]);
    }
    if (list && socketData) {
      const newList = [socketData, ...list];
      setList(newList);
    }
  }, [socketData]);

  useEffect(() => {
    if (+price === 0 && list[0]) {
      setPrice(list[0].price);
    }
  }, [list]);

  const value = useMemo(
    () => ({
      trades: list,
      setPrice,
      price
    }),
    [setPrice, price, list]
  );

  return (
    <TradingPriceContext.Provider value={value}>
      {children}
    </TradingPriceContext.Provider>
  );
};

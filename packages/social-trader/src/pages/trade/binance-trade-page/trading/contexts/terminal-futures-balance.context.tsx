import { BinancePositionSide } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import {
  CrossPositionInfo,
  FuturesBalance,
  FuturesOrder
} from "pages/trade/binance-trade-page/trading/terminal.types";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import { FuturesAccountUpdateEvent } from "../../services/futures/binance-futures.types";
import { getSymbolFromState } from "../terminal.helpers";
import {
  filterFuturesAccountUpdateStream,
  flatNormalizedPositions
} from "../terminal-futures.helpers";
import { calculateUnrealizedPNL } from "../trading-tables/positions/positions.helpers";
import { TerminalFuturesPositionsContext } from "./terminal-futures-positions.context";
import { TerminalMethodsContext } from "./terminal-methods.context";
import { TerminalOpenOrdersContext } from "./terminal-open-orders.context";
import { TerminalTickerContext } from "./terminal-ticker.context";

type SymbolMarginInfoType = {
  shortAdditionalMargin: number;
  longAdditionalMargin: number;
};

type FlattenOrderType = {
  id: string;
  symbol: string;
  notionalShort: number;
  notionalLong: number;
  positionSide: BinancePositionSide;
};

type TerminalFuturesBalanceContextState = {
  availableBalance: number;
  currentSymbolMarginInfo: SymbolMarginInfoType;
  futuresBalance?: FuturesBalance;
  crossPositionInfo?: CrossPositionInfo;
};

export const TerminalFuturesBalanceInitialState = {} as TerminalFuturesBalanceContextState;

export const TerminalFuturesBalanceContext = createContext<TerminalFuturesBalanceContextState>(
  TerminalFuturesBalanceInitialState
);

const ContextProvider: React.FC = ({ children }) => {
  const { $userStream, exchangeAccountId, symbol: currentSymbol } = useContext(
    TerminalInfoContext
  );
  const { getFuturesBalances: getFuturesBalancesRequest } = useContext(
    TerminalMethodsContext
  );
  const { openPositions, leverageBrackets, positionsList } = useContext(
    TerminalFuturesPositionsContext
  );
  const { markPrices } = useContext(TerminalTickerContext);
  const openOrdersContext = useContext(TerminalOpenOrdersContext);
  const openOrders = openOrdersContext.openOrders as FuturesOrder[];

  const {
    sendRequest: getFuturesBalances,
    data: futuresBalanceInfo
  } = useApiRequest({
    request: getFuturesBalancesRequest!
  });

  const [futuresBalance, setFuturesBalance] = useState<
    FuturesBalance | undefined
  >(undefined);
  const [availableBalance, setAvailableBalance] = useState<number>(0);
  const [flattenOpenOrders, setFlattenOpenOrders] = useState<
    FlattenOrderType[]
  >([]);
  const [
    openOrdersInitialMargin,
    setOpenOrdersInitialMargin
  ] = useState<number>(0);
  const [
    currentSymbolMarginInfo,
    setCurrentSymbolMarginInfo
  ] = useState<SymbolMarginInfoType>({
    shortAdditionalMargin: 0,
    longAdditionalMargin: 0
  });
  const [crossPositionInfo, setCrossPositionInfo] = useState<
    CrossPositionInfo | undefined
  >(undefined);
  const [socketData, setSocketData] = useState<
    FuturesAccountUpdateEvent | undefined
  >(undefined);

  const allPositions = useMemo(() => flatNormalizedPositions(positionsList), [
    positionsList
  ]);

  useEffect(() => {
    if (!exchangeAccountId) return;
    getFuturesBalances(exchangeAccountId);
  }, [exchangeAccountId]);

  useEffect(() => {
    if (!futuresBalanceInfo) return;
    const usdtFuturesBalance = futuresBalanceInfo.find(
      balance => balance.asset === "USDT"
    );
    setFuturesBalance(usdtFuturesBalance);
  }, [futuresBalanceInfo]);

  useEffect(() => {
    if (!$userStream) return;
    const balanceStream = filterFuturesAccountUpdateStream($userStream);
    balanceStream.subscribe(setSocketData);
  }, [$userStream]);

  useEffect(() => {
    if (!socketData || !futuresBalance) return;
    const socketBalance = socketData.balances.find(
      balance => balance.asset === "USDT"
    )!;
    setFuturesBalance(
      prevBalance =>
        ({
          ...prevBalance,
          crossWalletBalance: socketBalance.crossWalletBalance,
          walletBalance: socketBalance.walletBalance
        } as FuturesBalance)
    );
  }, [socketData]);

  useEffect(() => {
    // this array is used to calculate open orders margin
    // fox example: you can have two elements in open orders array
    // {price: 1000, quantity: 5, quantityFilled: 0, positionSide: "both", symbol: "BTCUSDT"}
    // {price: 1500, quantity: 4, quantityFilled: 0, positionSide: "both", symbol: "BTCUSDT"}
    // in fact you have TWO orders, but for proper calculations you have to make this orders as ONE, because they relate to ONE position
    const newFlattenOpenOrders: FlattenOrderType[] = [];
    openOrders.forEach(
      ({
        type,
        price,
        quantity,
        quantityFilled,
        symbol,
        positionSide,
        side
      }) => {
        if (type !== "Limit") {
          return;
        }

        const notionalShort =
          side === "Sell" ? price * (quantity - quantityFilled) : 0;
        const notionalLong =
          side === "Buy" ? price * (quantity - quantityFilled) : 0;

        const existingOrderIndex = newFlattenOpenOrders.findIndex(
          order => order.id === symbol + positionSide
        );

        if (existingOrderIndex !== -1) {
          const existingOrder = newFlattenOpenOrders[existingOrderIndex];
          const updatedOrder = {
            ...existingOrder,
            notionalShort: existingOrder.notionalShort + notionalShort,
            notionalLong: existingOrder.notionalLong + notionalLong
          };
          newFlattenOpenOrders[existingOrderIndex] = updatedOrder;
          return;
        }

        const newOrder = {
          id: symbol + positionSide,
          positionSide,
          symbol,
          notionalShort,
          notionalLong
        };
        newFlattenOpenOrders.push(newOrder);
      }
    );
    setFlattenOpenOrders(newFlattenOpenOrders);
  }, [openOrders]);

  useEffect(() => {
    // it is used to clear calculations for short(long)margin
    setCurrentSymbolMarginInfo({
      longAdditionalMargin: 0,
      shortAdditionalMargin: 0
    });
  }, [positionsList, openOrders]);

  useEffect(() => {
    const openOrdersMargin = flattenOpenOrders.reduce(
      (acc, { symbol, notionalLong, notionalShort, positionSide }) => {
        const position = allPositions.find(
          pos => pos.symbol === symbol && pos.positionSide === positionSide
        )!;
        const shortCost = notionalShort / position.leverage;
        const longCost = notionalLong / position.leverage;
        const mark = markPrices?.find(item => item.symbol === symbol);
        const markPrice = mark ? mark.markPrice : position.entryPrice;
        const margin = (markPrice * position.quantity) / position.leverage;

        if (
          positionSide === "Both" &&
          symbol === getSymbolFromState(currentSymbol)
        ) {
          // it is used only for one-way mode, because in hedge mode you don't need to consider opposite positions or orders
          setCurrentSymbolMarginInfo({
            longAdditionalMargin: Math.max(
              0,
              shortCost - longCost - margin * 2
            ),
            shortAdditionalMargin: Math.max(
              0,
              longCost - shortCost + margin * 2
            )
          });
        }
        // if there is no position margin = 0, cause position.quantity = 0
        const openOrderMargin =
          position.quantity > 0
            ? Math.max(longCost, shortCost - Math.abs(margin) * 2)
            : Math.max(shortCost, longCost - Math.abs(margin) * 2);
        return acc + openOrderMargin;
      },
      0
    );
    setOpenOrdersInitialMargin(openOrdersMargin);
  }, [positionsList, flattenOpenOrders, markPrices]);

  useEffect(() => {
    if (!futuresBalance) return;
    const crossPnl = crossPositionInfo ? crossPositionInfo.crossPnl : 0;
    const crossMargin = crossPositionInfo ? crossPositionInfo.crossMargin : 0;
    const avlBalance =
      futuresBalance.crossWalletBalance +
      crossPnl -
      crossMargin -
      openOrdersInitialMargin;
    setAvailableBalance(avlBalance);
  }, [futuresBalance, crossPositionInfo, openOrdersInitialMargin]);

  useEffect(() => {
    if (!futuresBalance || !leverageBrackets || !openPositions.length) {
      setCrossPositionInfo(undefined);
      return;
    }
    const crossOpenPositions = openPositions.filter(
      ({ marginType }) => marginType === "Cross"
    );
    if (!crossOpenPositions.length) {
      setCrossPositionInfo(undefined);
      return;
    }

    const crossPnl = crossOpenPositions.reduce(
      (acc, { entryPrice, quantity, symbol }) => {
        const mark = markPrices?.find(item => item.symbol === symbol);
        const markPrice = mark ? mark.markPrice : entryPrice;
        return (
          acc +
          calculateUnrealizedPNL({
            entryPrice,
            quantity,
            markPrice
          }).markPnl
        );
      },
      0
    );
    const { crossMargin, crossMaintMargin } = crossOpenPositions.reduce(
      (acc, { entryPrice, quantity, symbol, leverage }) => {
        const mark = markPrices?.find(item => item.symbol === symbol);
        const markPrice = mark ? mark.markPrice : entryPrice;
        const leverageBracket = leverageBrackets.find(
          item => item.symbol === symbol
        )!;

        const notionalSize = Math.abs(markPrice * quantity);

        const bracket = leverageBracket.brackets.find(
          bracket =>
            notionalSize >= bracket.notionalFloor &&
            notionalSize < bracket.notionalCap
        )!;

        const maintMargin =
          notionalSize * bracket.maintMarginRatio - bracket.maintAmount;

        return {
          crossMargin: acc.crossMargin + notionalSize / leverage,
          crossMaintMargin: acc.crossMaintMargin + maintMargin
        };
      },
      { crossMargin: 0, crossMaintMargin: 0 }
    );
    const crossMarginBalance = futuresBalance.crossWalletBalance + crossPnl;
    const crossMarginRatio = (crossMaintMargin / crossMarginBalance) * 100;

    setCrossPositionInfo({
      crossMaintMargin,
      crossMarginBalance,
      crossMarginRatio,
      crossPnl,
      crossMargin
    });
  }, [futuresBalance, leverageBrackets, openPositions, markPrices]);

  const value = useMemo(
    () => ({
      futuresBalance,
      crossPositionInfo,
      availableBalance: Math.max(0, availableBalance),
      currentSymbolMarginInfo
    }),
    [
      futuresBalance,
      crossPositionInfo,
      availableBalance,
      currentSymbolMarginInfo.longAdditionalMargin,
      currentSymbolMarginInfo.shortAdditionalMargin
    ]
  );

  return (
    <TerminalFuturesBalanceContext.Provider value={value}>
      {children}
    </TerminalFuturesBalanceContext.Provider>
  );
};

export const TerminalFuturesBalanceContextProvider: React.FC = ({
  children
}) => {
  const { terminalType } = useContext(TerminalInfoContext);

  return terminalType === "futures" ? (
    <ContextProvider>{children}</ContextProvider>
  ) : (
    <>{children}</>
  );
};

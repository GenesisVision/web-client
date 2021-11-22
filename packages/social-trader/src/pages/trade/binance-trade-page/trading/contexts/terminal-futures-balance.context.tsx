import { BinanceRawFuturesAccountAsset } from "gv-api-web";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import {
  CrossPositionInfo,
  FuturesOrder,
  LeverageBracket as LeverageBracketType,
  Position,
  SymbolLeverageBrackets
} from "pages/trade/binance-trade-page/trading/terminal.types";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import {
  FuturesAccountEventBalance,
  FuturesAccountUpdateEvent
} from "../../services/futures/binance-futures.types";
import {
  filterFuturesAccountUpdateStream,
  flatNormalizedPositions
} from "../terminal-futures.helpers";
import { calculateUnrealizedPNL } from "../trading-tables/positions/positions.helpers";
import { TerminalFuturesPositionsContext } from "./terminal-futures-positions.context";
import { TerminalOpenOrdersContext } from "./terminal-open-orders.context";
import { TerminalTickerContext } from "./terminal-ticker.context";

type TerminalFuturesBalanceContextState = {
  availableBalance: number;
  futureBalance?: BinanceRawFuturesAccountAsset;
  crossPositionInfo?: CrossPositionInfo;
};

export const TerminalFuturesBalanceInitialState = {} as TerminalFuturesBalanceContextState;

export const TerminalFuturesBalanceContext = createContext<TerminalFuturesBalanceContextState>(
  TerminalFuturesBalanceInitialState
);

const ContextProvider: React.FC = ({ children }) => {
  const { accountInfo, $userStream } = useContext(TerminalInfoContext);
  const { openPositions, leverageBrackets, positionsList } = useContext(
    TerminalFuturesPositionsContext
  );
  const { markPrices } = useContext(TerminalTickerContext);
  const openOrdersContext = useContext(TerminalOpenOrdersContext);
  const openOrders = openOrdersContext.openOrders as FuturesOrder[];

  const [futureBalance, setFutureBalance] = useState<
    BinanceRawFuturesAccountAsset | undefined
  >(undefined);
  const [availableBalance, setAvailableBalance] = useState<number>(0);
  const [openOrdersInitialMargin, setOpenOrdersInitalMargin] = useState<number>(
    0
  );
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
    if (!$userStream) return;
    const balanceStream = filterFuturesAccountUpdateStream($userStream);
    balanceStream.subscribe(setSocketData);
  }, [$userStream]);

  useEffect(() => {
    if (!socketData || !futureBalance) return;
    // dont forget about funding fee
    const socketBalance = socketData.balances.find(
      balance => balance.asset === "USDT"
    ) as FuturesAccountEventBalance;
    setFutureBalance(
      prevBalance =>
        ({
          ...prevBalance,
          crossWalletBalance: socketBalance.crossWalletBalance,
          walletBalance: socketBalance.walletBalance
        } as BinanceRawFuturesAccountAsset)
    );
  }, [socketData]);

  useEffect(() => {
    const openOrdersMargin = openOrders.reduce(
      (acc, { price, quantity, symbol }) => {
        const position = allPositions.find(
          pos => pos.symbol === symbol
        ) as Position;
        const totalCost = (price * Math.abs(quantity)) / position.leverage;
        if (position.quantity === 0) {
          return acc + totalCost;
        }
        const mark = markPrices?.find(item => item.symbol === symbol);
        const markPrice = mark ? mark.markPrice : position.entryPrice;
        const margin =
          (markPrice * Math.abs(position.quantity)) / position.leverage;
        const increment = Math.max(0, totalCost - margin * 2);
        return acc + increment;
      },
      0
    );
    setOpenOrdersInitalMargin(openOrdersMargin);
  }, [openOrders, positionsList, markPrices]);

  useEffect(() => {
    if (crossPositionInfo || !futureBalance) return;
    const avlBalance =
      futureBalance.crossWalletBalance - openOrdersInitialMargin;
    setAvailableBalance(avlBalance);
  }, [futureBalance, crossPositionInfo, openOrdersInitialMargin]);

  useEffect(() => {
    if (!accountInfo) return;
    // fix types
    const usdtBalance = (accountInfo.balances.find(
      balance => balance.asset === "USDT"
    ) as unknown) as BinanceRawFuturesAccountAsset;
    setFutureBalance(usdtBalance);
  }, [accountInfo?.balances]);

  useEffect(() => {
    if (!futureBalance || !leverageBrackets || !openPositions.length) {
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
        ) as SymbolLeverageBrackets;

        const notionalSize = Math.abs(markPrice * quantity);

        const bracket = leverageBracket.brackets.find(
          bracket =>
            notionalSize >= bracket.notionalFloor &&
            notionalSize < bracket.notionalCap
        ) as LeverageBracketType;

        const maintMargin =
          notionalSize * bracket.maintMarginRatio - bracket.maintAmount;

        return {
          crossMargin: acc.crossMargin + notionalSize / leverage,
          crossMaintMargin: acc.crossMaintMargin + maintMargin
        };
      },
      { crossMargin: 0, crossMaintMargin: 0 }
    );
    const crossMarginBalance = futureBalance.crossWalletBalance + crossPnl;
    const crossMarginRatio = (crossMaintMargin / crossMarginBalance) * 100;

    const avlBalance =
      futureBalance.crossWalletBalance +
      crossPnl -
      crossMargin -
      openOrdersInitialMargin;

    setAvailableBalance(avlBalance);

    setCrossPositionInfo({
      crossMaintMargin,
      crossMarginBalance,
      crossMarginRatio,
      crossPnl,
      crossMargin
    });
  }, [
    futureBalance,
    leverageBrackets,
    openPositions,
    markPrices,
    openOrdersInitialMargin
  ]);

  const value = useMemo(
    () => ({
      futureBalance,
      crossPositionInfo,
      availableBalance: Math.max(0, availableBalance)
    }),
    [futureBalance, crossPositionInfo, availableBalance]
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

import { BinanceRawFuturesAccountAsset } from "gv-api-web";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import {
  CrossPositionInfo,
  LeverageBracket as LeverageBracketType,
  SymbolLeverageBrackets
} from "pages/trade/binance-trade-page/trading/terminal.types";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import { calculateUnrealizedPNL } from "../trading-tables/positions/positions.helpers";
import { TerminalFuturesPositionsContext } from "./terminal-futures-positions.context";
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
  const { accountInfo } = useContext(TerminalInfoContext);
  const { openPositions, leverageBrackets } = useContext(
    TerminalFuturesPositionsContext
  );
  const { markPrices } = useContext(TerminalTickerContext);

  const [futureBalance, setFutureBalance] = useState<
    BinanceRawFuturesAccountAsset | undefined
  >(undefined);
  const [availableBalance, setAvailableBalance] = useState<number>(0);
  const [crossPositionInfo, setCrossPositionInfo] = useState<
    CrossPositionInfo | undefined
  >(undefined);

  useEffect(() => {
    if (!accountInfo) return;
    // fix types
    const usdtBalance = (accountInfo.balances.find(
      balance => balance.asset === "USDT"
    ) as unknown) as BinanceRawFuturesAccountAsset;
    setFutureBalance(usdtBalance);
    setAvailableBalance(usdtBalance ? usdtBalance.availableBalance : 0);
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
    const { crossPositionsSum, crossMaintMargin } = crossOpenPositions.reduce(
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
          crossPositionsSum: acc.crossPositionsSum + notionalSize / leverage,
          crossMaintMargin: acc.crossMaintMargin + maintMargin
        };
      },
      { crossPositionsSum: 0, crossMaintMargin: 0 }
    );
    const crossMarginBalance = futureBalance.crossWalletBalance + crossPnl;
    const crossMarginRatio = (crossMaintMargin / crossMarginBalance) * 100;

    const avlBalance =
      futureBalance.crossWalletBalance +
      crossPnl -
      crossPositionsSum -
      futureBalance.openOrderInitialMargin;

    setAvailableBalance(avlBalance);

    setCrossPositionInfo({
      crossMaintMargin,
      crossMarginBalance,
      crossMarginRatio,
      crossPnl,
      crossPositionsSum
    });
  }, [futureBalance, leverageBrackets, openPositions, markPrices]);

  const value = useMemo(
    () => ({
      futureBalance,
      crossPositionInfo,
      availableBalance
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

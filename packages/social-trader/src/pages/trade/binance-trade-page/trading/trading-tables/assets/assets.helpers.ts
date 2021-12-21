import { SortingColumn } from "components/table/components/filtering/filter.type";
import { BinanceRawFuturesAccountBalance } from "gv-api-web";
import { useContext } from "react";

import { TerminalTickerContext } from "../../contexts/terminal-ticker.context";
import { calculateUnrealizedPNL } from "../positions/positions.helpers";
import { TerminalFuturesBalanceContext } from "./../../contexts/terminal-futures-balance.context";
import { TerminalFuturesPositionsContext } from "./../../contexts/terminal-futures-positions.context";

export const ASSETS_TABLE_COLUMNS: SortingColumn[] = [
  {
    name: "asset"
  },
  {
    name: "wallet-balance"
  },
  {
    name: "unrealized-pnl"
  },
  {
    name: "available"
  },
  {
    name: "margin-balance"
  }
];

export const createBnbFuturesTableAsset = ({
  asset,
  walletBalance
}: BinanceRawFuturesAccountBalance): FuturesTableAsset => {
  return {
    asset,
    walletBalance,
    available: 0,
    marginBalance: 0,
    unrealizedPnl: 0
  };
};

export const useUsdtFuturesTableAsset = (
  balance?: BinanceRawFuturesAccountBalance
): FuturesTableAsset => {
  const { markPrices } = useContext(TerminalTickerContext);
  const { openPositions } = useContext(TerminalFuturesPositionsContext);
  const { crossPositionInfo, availableBalance } = useContext(
    TerminalFuturesBalanceContext
  );
  const isolatedPositions = openPositions.filter(
    ({ marginType }) => marginType === "Isolated"
  );
  const { isolatedPnl, isolatedMarginBalance } = isolatedPositions.reduce(
    (acc, { isolatedMargin, unrealizedPnL, entryPrice, quantity, symbol }) => {
      const isolatedWallet = isolatedMargin - unrealizedPnL;
      const mark = markPrices?.find(item => item.symbol === symbol);
      const markPrice = mark ? mark.markPrice : entryPrice;
      const { pnl } = calculateUnrealizedPNL({
        quantity,
        entryPrice,
        markPrice
      });
      const marginBalance = isolatedWallet + pnl;
      return {
        isolatedPnl: acc.isolatedPnl + pnl,
        isolatedMarginBalance: acc.isolatedMarginBalance + marginBalance
      };
    },
    { isolatedPnl: 0, isolatedMarginBalance: 0 }
  );
  const walletBalance = balance ? balance.walletBalance : 0;
  const crossPnl = crossPositionInfo ? crossPositionInfo.crossPnl : 0;
  const crossMarginBalance = crossPositionInfo
    ? crossPositionInfo.crossMarginBalance
    : 0;

  return {
    asset: "USDT",
    walletBalance,
    available: availableBalance,
    marginBalance: crossMarginBalance + isolatedMarginBalance,
    unrealizedPnl: crossPnl + isolatedPnl
  };
};

export type FuturesTableAsset = {
  asset: string;
  walletBalance: number;
  unrealizedPnl: number;
  available: number;
  marginBalance: number;
};

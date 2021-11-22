import { SortingColumn } from "components/table/components/filtering/filter.type";
import { BinancePositionSide, BinanceWorkingType } from "gv-api-web";
import { TerminalTickerContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-ticker.context";
import { useContext } from "react";

import { TerminalFuturesPositionsContext } from "../../contexts/terminal-futures-positions.context";
import {
  LeverageBracket as LeverageBracketType,
  SymbolLeverageBrackets
} from "./../../terminal.types";

export const POSITIONS_TABLE_COLUMNS: SortingColumn[] = [
  {
    name: "symbol"
  },
  {
    name: "size",
    tooltip: true
  },
  {
    name: "entry-price",
    tooltip: true
  },
  {
    name: "mark-price",
    tooltip: true
  },
  {
    name: "liq-price",
    tooltip: true
  },
  {
    name: "margin-ratio",
    tooltip: true
  },
  {
    name: "margin",
    tooltip: true
  },
  {
    name: "pnl",
    tooltip: true
  },
  {
    name: "tp-sl",
    tooltip: true
  },
  {
    name: "notional-size"
  },
  // {
  //   name: "adl",
  //   tooltip: true
  // },
  {
    name: "action"
  }
];

export const USDTtickSize = "0.01";

interface ICalculatePnlInputData {
  quantity: number;
  entryPrice: number;
  markPrice: number;
  workingType?: BinanceWorkingType;
  lastPrice?: number;
}

// https://www.binance.com/en/support/faq/3a55a23768cb416fb404f06ffedde4b2
export const calculateUnrealizedPNL = ({
  quantity,
  entryPrice,
  workingType = "Mark",
  markPrice,
  lastPrice
}: ICalculatePnlInputData): { markPnl: number; pnl: number } => {
  const direction = quantity < 0 ? -1 : 1;
  const markPnl = Math.abs(quantity) * direction * (markPrice - entryPrice);
  const contractPnl =
    workingType === "Contract"
      ? Math.abs(quantity) * direction * (lastPrice! - entryPrice)
      : 0;
  const pnl = workingType === "Contract" ? contractPnl : markPnl;
  return { markPnl, pnl };
};
interface ICalculateROEInputData {
  pnl: number;
  quantity: number;
  leverage: number;
  markPrice: number;
}

// https://www.binance.com/en/support/faq/3a55a23768cb416fb404f06ffedde4b2
export const calculateROE = ({
  pnl,
  quantity,
  leverage,
  markPrice
}: ICalculateROEInputData): number => {
  const imr = 1 / leverage;
  return pnl / (Math.abs(quantity) * markPrice * imr);
};

interface ICalculateIsolatedMarginRatioInputData {
  margin: number;
  pnl: number;
  symbol: string;
  notionalSize: number;
  leverageBrackets?: SymbolLeverageBrackets[];
}

export const calculateIsolatedMarginRatioInfo = ({
  pnl,
  margin,
  symbol,
  notionalSize,
  leverageBrackets
}: ICalculateIsolatedMarginRatioInputData): {
  marginRatio: number;
  maintMargin: number;
  marginBalance: number;
  maintMarginRate: number;
  maintAmount: number;
} => {
  if (!leverageBrackets)
    return {
      maintMargin: 0,
      marginBalance: 0,
      marginRatio: 0,
      maintAmount: 0,
      maintMarginRate: 0
    };

  const leverageBracket = leverageBrackets.find(
    item => item.symbol === symbol
  ) as SymbolLeverageBrackets;

  const marginBalance = pnl + margin;

  const { maintAmount, maintMarginRatio } = leverageBracket.brackets.find(
    bracket =>
      notionalSize >= bracket.notionalFloor &&
      notionalSize < bracket.notionalCap
  ) as LeverageBracketType;

  const maintMargin = maintMarginRatio * notionalSize - maintAmount;
  const marginRatio = (maintMargin / marginBalance) * 100;

  return {
    marginRatio,
    maintMargin,
    marginBalance,
    maintMarginRate: maintMarginRatio,
    maintAmount
  };
};

// https://www.binance.com/en/support/faq/360036498511
export const calculateRealizedPNL = ({
  entryPrice,
  exitPrice,
  quantity,
  direction
}: {
  entryPrice: number;
  exitPrice: number;
  quantity: number;
  direction: "Short" | "Long";
}): number => {
  if (direction === "Long") {
    return (exitPrice - entryPrice) * Math.abs(quantity);
  }
  return (entryPrice - exitPrice) * Math.abs(quantity);
};

// https://www.binance.com/en/support/faq/b3c689c1f50a44cabb3a84e663b81d93
interface ICrossLiqPriceInputData {
  symbol: string;
  crossWalletBalance: number;
  crossMaintMargin: number;
  crossPnl: number;
}

export const useCalculateCrossLiqPrice = ({
  symbol,
  crossMaintMargin,
  crossWalletBalance,
  crossPnl
}: ICrossLiqPriceInputData): number => {
  const { openPositions, leverageBrackets } = useContext(
    TerminalFuturesPositionsContext
  );
  const { markPrices } = useContext(TerminalTickerContext);

  if (!leverageBrackets) {
    return 0;
  }

  const symbolPositions = openPositions.filter(pos => pos.symbol === symbol);

  const mark = markPrices?.find(mark => mark.symbol === symbol);

  const markPrice = mark ? mark.markPrice : 0;

  const leverageBracket = leverageBrackets.find(
    item => item.symbol === symbol
  ) as SymbolLeverageBrackets;

  const longPosition = symbolPositions.find(
    ({ positionSide }) => positionSide === "Long"
  );
  const shortPosition = symbolPositions.find(
    ({ positionSide }) => positionSide === "Short"
  );
  const bothPosition = symbolPositions.find(
    ({ positionSide }) => positionSide === "Both"
  );

  const positionPnl = symbolPositions.reduce(
    (acc, curr) =>
      acc +
      calculateUnrealizedPNL({
        entryPrice: curr.entryPrice,
        quantity: curr.quantity,
        markPrice
      }).markPnl,
    0
  );
  const positionMaintMargin = symbolPositions.reduce((acc, curr) => {
    const notionalSize = markPrice * Math.abs(curr.quantity);

    const bracket = leverageBracket.brackets.find(
      bracket =>
        notionalSize >= bracket.notionalFloor &&
        notionalSize < bracket.notionalCap
    ) as LeverageBracketType;

    return (
      acc + (notionalSize * bracket.maintMarginRatio - bracket.maintAmount)
    );
  }, 0);

  const longMarginBracketInfo = longPosition
    ? leverageBracket.brackets.find(
        bracket =>
          markPrice * Math.abs(longPosition.quantity) >=
            bracket.notionalFloor &&
          markPrice * Math.abs(longPosition.quantity) < bracket.notionalCap
      )
    : undefined;

  const shortMarginBracketInfo = shortPosition
    ? leverageBracket.brackets.find(
        bracket =>
          markPrice * Math.abs(shortPosition.quantity) >=
            bracket.notionalFloor &&
          markPrice * Math.abs(shortPosition.quantity) < bracket.notionalCap
      )
    : undefined;

  const bothMarginBracketInfo = bothPosition
    ? leverageBracket.brackets.find(
        bracket =>
          markPrice * Math.abs(bothPosition.quantity) >=
            bracket.notionalFloor &&
          markPrice * Math.abs(bothPosition.quantity) < bracket.notionalCap
      )
    : undefined;

  const wb = crossWalletBalance;
  const TMM1 = crossMaintMargin - positionMaintMargin;
  const UPNL1 = crossPnl - positionPnl;
  const cumB = bothMarginBracketInfo ? bothMarginBracketInfo.maintAmount : 0;
  const cumL = longMarginBracketInfo ? longMarginBracketInfo.maintAmount : 0;
  const cumS = shortMarginBracketInfo ? shortMarginBracketInfo.maintAmount : 0;
  const side1Both = bothPosition ? (bothPosition.quantity > 0 ? 1 : -1) : 0;
  const position1Both = bothPosition ? Math.abs(bothPosition.quantity) : 0;
  const ep1Both = bothPosition ? bothPosition.entryPrice : 0;
  const position1Long = longPosition ? Math.abs(longPosition.quantity) : 0;
  const ep1Long = longPosition ? longPosition.entryPrice : 0;
  const position1Short = shortPosition ? Math.abs(shortPosition.quantity) : 0;
  const ep1Short = shortPosition ? shortPosition.entryPrice : 0;
  const MMRb = bothMarginBracketInfo
    ? bothMarginBracketInfo.maintMarginRatio
    : 0;
  const MMRl = longMarginBracketInfo
    ? longMarginBracketInfo.maintMarginRatio
    : 0;
  const MMRs = shortMarginBracketInfo
    ? shortMarginBracketInfo.maintMarginRatio
    : 0;

  return (
    (wb -
      TMM1 +
      UPNL1 +
      cumB +
      cumL +
      cumS -
      side1Both * position1Both * ep1Both -
      position1Long * ep1Long +
      position1Short * ep1Short) /
    (position1Both * MMRb +
      position1Long * MMRl +
      position1Short * MMRs -
      side1Both * position1Both -
      position1Long +
      position1Short)
  );
};

// https://www.binance.com/en/support/faq/b3c689c1f50a44cabb3a84e663b81d93
interface IIsolatedLiqPriceInputData {
  isolatedWallet: number;
  positionSide: BinancePositionSide;
  maintMarginRate: number;
  maintAmount: number;
  entryPrice: number;
  quantity: number;
}
export const calculateIsolatedLiqPrice = ({
  isolatedWallet,
  maintMarginRate,
  maintAmount,
  positionSide,
  quantity,
  entryPrice
}: IIsolatedLiqPriceInputData): number => {
  const wb = isolatedWallet;
  const cumB = positionSide === "Both" ? maintAmount : 0;
  const cumL = positionSide === "Long" ? maintAmount : 0;
  const cumS = positionSide === "Short" ? maintAmount : 0;
  const side1Both = positionSide === "Both" ? (quantity > 0 ? 1 : -1) : 0;
  const position1Both = positionSide === "Both" ? Math.abs(quantity) : 0;
  const ep1Both = positionSide === "Both" ? entryPrice : 0;
  const position1Long = positionSide === "Long" ? Math.abs(quantity) : 0;
  const ep1Long = positionSide === "Long" ? entryPrice : 0;
  const position1Short = positionSide === "Short" ? Math.abs(quantity) : 0;
  const ep1Short = positionSide === "Short" ? entryPrice : 0;
  const MMRb = positionSide === "Both" ? maintMarginRate : 0;
  const MMRl = positionSide === "Long" ? maintMarginRate : 0;
  const MMRs = positionSide === "Short" ? maintMarginRate : 0;

  return (
    (wb -
      cumB +
      cumL +
      cumS -
      side1Both * position1Both * ep1Both -
      position1Long * ep1Long +
      position1Short * ep1Short) /
    (position1Both * MMRb +
      position1Long * MMRl +
      position1Short * MMRs -
      side1Both * position1Both -
      position1Long +
      position1Short)
  );
};

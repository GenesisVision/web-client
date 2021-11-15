import { BinanceRawSymbol, BinanceWorkingType } from "gv-api-web";
import { Position } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext } from "react";

import { TerminalFuturesBalanceContext } from "../../contexts/terminal-futures-balance.context";
import { TerminalFuturesPositionsContext } from "../../contexts/terminal-futures-positions.context";
import { TerminalInfoContext } from "../../contexts/terminal-info.context";
import { TerminalTickerContext } from "../../contexts/terminal-ticker.context";
import {
  calculateIsolatedMarginRatioInfo,
  calculateROE,
  calculateUnrealizedPNL
} from "./positions.helpers";
import { PositionsRow } from "./positions-row";

interface Props {
  position: Position;
  workingType: BinanceWorkingType;
}

const _PositionsRowContainer: React.FC<Props> = ({ workingType, position }) => {
  const {
    positionSide,
    entryPrice,
    leverage,
    quantity,
    symbol,
    isolatedMargin,
    unrealizedPnL,
    marginType,
    markPrice: staleMarkPrice
  } = position;
  const { markPrices, items } = useContext(TerminalTickerContext);
  const { exchangeInfo, setSymbol } = useContext(TerminalInfoContext);
  const { leverageBrackets } = useContext(TerminalFuturesPositionsContext);
  const { crossPositionInfo } = useContext(TerminalFuturesBalanceContext);
  const symbolInfo = exchangeInfo!.symbols.find(
    item => symbol === item.baseAsset + item.quoteAsset
  ) as BinanceRawSymbol;
  const { baseAsset, quoteAsset, priceFilter, lotSizeFilter } = symbolInfo;

  const tickSize = String(priceFilter.tickSize);
  const stepSize = String(lotSizeFilter.stepSize);
  const mark = markPrices?.find(item => item.symbol === symbol);
  const markPrice = mark ? mark.markPrice : staleMarkPrice;
  const item = items?.find(item => item.symbol === symbol);
  const lastPrice = item ? item.lastPrice : entryPrice;
  const notionalSize = Math.abs(markPrice * quantity);

  const { pnl, markPnl } = calculateUnrealizedPNL({
    quantity,
    entryPrice,
    workingType,
    lastPrice,
    markPrice
  });

  const roe = calculateROE({ quantity, pnl, markPrice, leverage });

  const margin =
    marginType === "Isolated"
      ? isolatedMargin - unrealizedPnL
      : notionalSize / leverage;

  const isolatedMarginInfo =
    marginType === "Isolated"
      ? calculateIsolatedMarginRatioInfo({
          pnl: markPnl,
          margin,
          symbol,
          notionalSize,
          leverageBrackets
        })
      : undefined;

  const maintMargin =
    marginType === "Cross"
      ? crossPositionInfo
        ? crossPositionInfo.crossMaintMargin
        : 0
      : isolatedMarginInfo!.maintMargin;

  const marginRatio =
    marginType === "Cross"
      ? crossPositionInfo
        ? crossPositionInfo.crossMarginRatio
        : 0
      : isolatedMarginInfo!.marginRatio;

  return (
    <PositionsRow
      maintMargin={maintMargin}
      marginRatio={marginRatio}
      maintMarginRate={isolatedMarginInfo?.maintMarginRate}
      maintAmount={isolatedMarginInfo?.maintAmount}
      margin={margin}
      roe={roe}
      pnl={pnl}
      marginType={marginType}
      markPrice={markPrice}
      notionalSize={notionalSize}
      baseAsset={baseAsset}
      entryPrice={entryPrice}
      leverage={leverage}
      positionSide={positionSide}
      quantity={quantity}
      quoteAsset={quoteAsset}
      setSymbol={setSymbol}
      staleMarkPrice={staleMarkPrice ? staleMarkPrice : entryPrice}
      stepSize={stepSize}
      symbol={symbol}
      tickSize={tickSize}
    />
  );
};

export const PositionsRowContainer = React.memo(_PositionsRowContainer);

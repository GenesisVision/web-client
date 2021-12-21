import { useContext } from "react";
import { calculatePercentage } from "utils/currency-converter";

import { TerminalFuturesBalanceContext } from "../../contexts/terminal-futures-balance.context";
import { TerminalFuturesPositionsContext } from "../../contexts/terminal-futures-positions.context";
import { TerminalInfoContext } from "../../contexts/terminal-info.context";
import { TerminalPlaceOrderContext } from "../../contexts/terminal-place-order.context";
import { TerminalTickerContext } from "../../contexts/terminal-ticker.context";
import { TradingPriceContext } from "../../contexts/trading-price.context";
import { getSymbolFromState } from "../../terminal.helpers";

const LONG_ORDER_DIRECTION = 1;
const SHORT_ORDER_DIRECTION = -1;

// https://www.binance.com/en/support/faq/87fa7ee33b574f7084d42bd2ce2e463b

export interface PlaceOrderMaxCostInputValues {
  balance: number;
  quantity: string | number;
  percentMode: boolean;
  reduceOnly?: boolean;
}

interface PlaceOrderMaxCostOutputValues {
  longCost: number;
  shortCost: number;
  maxLong: number;
  maxShort: number;
  sliderBuy: number;
  sliderSell: number;
}

export const usePlaceOrderMaxCostValues = ({
  percentMode,
  balance,
  quantity: quantityProp,
  orderPrice: price,
  reduceOnly
}: PlaceOrderMaxCostInputValues & {
  orderPrice: number | string;
}): PlaceOrderMaxCostOutputValues => {
  const { markPrice: mark } = useContext(TerminalTickerContext);
  const { openPositions } = useContext(TerminalFuturesPositionsContext);
  const { currentSymbolMarginInfo } = useContext(TerminalFuturesBalanceContext);
  const { exchangeAccountId, symbol } = useContext(TerminalInfoContext);
  const { leverage, placeOrderMode, maxNotional } = useContext(
    TerminalPlaceOrderContext
  );

  // if user has not chosen an account, it just doesn't make sense to calculate values
  if (!exchangeAccountId) {
    return {
      longCost: 0,
      shortCost: 0,
      maxLong: 0,
      maxShort: 0,
      sliderBuy: 0,
      sliderSell: 0
    };
  }

  const quantity = isNaN(+quantityProp) ? 0 : +quantityProp;

  const symbolPositions = openPositions.filter(
    pos => pos.symbol === getSymbolFromState(symbol)
  );

  const longPosition = symbolPositions.find(pos => pos.quantity > 0);
  const shortPosition = symbolPositions.find(pos => pos.quantity < 0);

  const longPositionQuantity = longPosition
    ? Math.abs(longPosition.quantity)
    : 0;
  const shortPositionQuantity = shortPosition
    ? Math.abs(shortPosition.quantity)
    : 0;

  if (placeOrderMode === "HedgeClose") {
    const maxLong = shortPositionQuantity;
    const maxShort = longPositionQuantity;
    return {
      longCost: 0,
      shortCost: 0,
      maxLong,
      maxShort,
      sliderBuy: percentMode ? calculatePercentage(maxLong, quantity) : 0,
      sliderSell: percentMode ? calculatePercentage(maxShort, quantity) : 0
    };
  }

  const orderPrice = isNaN(+price) ? 0 : +price;
  const markPrice = mark ? mark.markPrice : 0;
  const longNotionalSize = markPrice * longPositionQuantity;
  const shortNotionalSize = markPrice * shortPositionQuantity;
  const imr = 1 / leverage;

  // in one-way mode you have to consider opposite "side" to calculate margin
  const longAdditionalMargin =
    placeOrderMode === "OneWay"
      ? currentSymbolMarginInfo.longAdditionalMargin
      : 0;
  const shortAdditionalMargin =
    placeOrderMode === "OneWay"
      ? currentSymbolMarginInfo.shortAdditionalMargin
      : 0;

  // Step 1: Calculate Open Loss
  const longDiff = Math.abs(
    Math.min(0, LONG_ORDER_DIRECTION * (markPrice - orderPrice))
  );

  // There is no "1 + imr" in article's formula, but i've added it during my own calculations
  // It seems like binance article is wrong
  const shortDiff = Math.abs(
    (1 + imr) * Math.min(0, SHORT_ORDER_DIRECTION * (markPrice - orderPrice))
  );

  let maxLong =
    (balance + longAdditionalMargin) / (orderPrice / leverage + longDiff);

  // calculate maxNotional restrictions
  // note: in hedge mode you can have two different positions, but max notional value is used for SYMBOL, NOT UNIQUE POSITION
  const maxNotionalForLong =
    placeOrderMode === "OneWay"
      ? maxNotional + shortNotionalSize - longNotionalSize
      : maxNotional - shortNotionalSize - longNotionalSize;
  maxLong = Math.min(maxLong, Math.max(0, maxNotionalForLong) / orderPrice);

  // fix ui display
  maxLong = isFinite(maxLong) ? maxLong : 0;

  // apply reduceOnly
  maxLong = reduceOnly ? shortPositionQuantity : maxLong;

  let maxShort =
    (balance + shortAdditionalMargin) / (orderPrice / leverage + shortDiff);

  // calculate maxNotional restrictions
  // note: in hedge mode you can have two different positions, but max notional value is used for SYMBOL, NOT UNIQUE POSITION
  const maxNotionalForShort =
    placeOrderMode === "OneWay"
      ? maxNotional + longNotionalSize - shortNotionalSize
      : maxNotional - shortNotionalSize - longNotionalSize;
  maxShort = Math.min(
    maxShort,
    // there is Math.max(orderPrice, markPrice) because orders execute at the best price
    // if orderPrice < markPrice then short order executes at markPrice
    Math.max(0, maxNotionalForShort) / Math.max(orderPrice, markPrice)
  );

  // fix ui display
  maxShort = isFinite(maxShort) ? maxShort : 0;

  // apply reduceOnly
  maxShort = reduceOnly ? longPositionQuantity : maxShort;

  const sliderBuy = percentMode ? calculatePercentage(maxLong, quantity) : 0;
  const sliderSell = percentMode ? calculatePercentage(maxShort, quantity) : 0;

  const quantityLong = percentMode ? sliderBuy : quantity;
  const quantityShort = percentMode ? sliderSell : quantity;

  // Step 2: Calculate the Initial Margin
  const longInitialMargin = (orderPrice * quantityLong) / leverage;
  const shortInitialMargin = (orderPrice * quantityShort) / leverage;

  const longOpenLoss = quantityLong * longDiff;
  const shortOpenLoss = quantityShort * shortDiff;

  // Step 3: Calculate the cost required to open a position
  // in one-way mode you have to consider opposite "side" to calculate cost
  const longCost = Math.max(
    0,
    longInitialMargin + longOpenLoss - longAdditionalMargin
  );
  const shortCost = Math.max(
    0,
    shortInitialMargin + shortOpenLoss - shortAdditionalMargin
  );

  return {
    longCost,
    shortCost,
    maxLong,
    maxShort,
    sliderBuy,
    sliderSell
  };
};

export const useMarketPlaceOrderMaxCostValues = ({
  percentMode,
  balance,
  quantity: quan,
  reduceOnly
}: PlaceOrderMaxCostInputValues): PlaceOrderMaxCostOutputValues => {
  const { markPrice: mark } = useContext(TerminalTickerContext);
  const { currentSymbolMarginInfo } = useContext(TerminalFuturesBalanceContext);
  const { openPositions } = useContext(TerminalFuturesPositionsContext);
  const { symbol, exchangeAccountId } = useContext(TerminalInfoContext);
  const { leverage, placeOrderMode, maxNotional } = useContext(
    TerminalPlaceOrderContext
  );
  const { bestAskPrice: bestAsk, bestBidPrice: bestBid } = useContext(
    TradingPriceContext
  );

  // if user has not chosen an account, it just doesn't make sense to calculate values
  if (!exchangeAccountId) {
    return {
      longCost: 0,
      shortCost: 0,
      maxLong: 0,
      maxShort: 0,
      sliderBuy: 0,
      sliderSell: 0
    };
  }

  const bestAskPrice = bestAsk ? bestAsk : 0;
  const bestBidPrice = bestBid ? bestBid : 0;
  const quantity = isNaN(+quan) ? 0 : +quan;

  const symbolPositions = openPositions.filter(
    pos => pos.symbol === getSymbolFromState(symbol)
  );

  const longPosition = symbolPositions.find(pos => pos.quantity > 0);
  const shortPosition = symbolPositions.find(pos => pos.quantity < 0);

  const longPositionQuantity = longPosition
    ? Math.abs(longPosition.quantity)
    : 0;
  const shortPositionQuantity = shortPosition
    ? Math.abs(shortPosition.quantity)
    : 0;

  if (placeOrderMode === "HedgeClose") {
    const maxLong = shortPositionQuantity;
    const maxShort = longPositionQuantity;
    return {
      longCost: 0,
      shortCost: 0,
      maxLong,
      maxShort,
      sliderBuy: percentMode ? calculatePercentage(maxLong, quantity) : 0,
      sliderSell: percentMode ? calculatePercentage(maxShort, quantity) : 0
    };
  }

  const markPrice = mark ? mark.markPrice : 0;
  const longNotionalSize = markPrice * longPositionQuantity;
  const shortNotionalSize = markPrice * shortPositionQuantity;
  const imr = 1 / leverage;

  // in one-way mode you have to consider opposite "side" to calculate margin
  const longAdditionalMargin =
    placeOrderMode === "OneWay"
      ? currentSymbolMarginInfo.longAdditionalMargin
      : 0;
  const shortAdditionalMargin =
    placeOrderMode === "OneWay"
      ? currentSymbolMarginInfo.shortAdditionalMargin
      : 0;

  // Step 1: Calculate assuming price
  const longOrderAssumingPrice = bestAskPrice * 1.0005;
  const shortOrderAssumingPrice = Math.max(bestBidPrice, markPrice);

  // Step 2: Calculate Open Loss
  const longDiff = Math.abs(
    Math.min(0, LONG_ORDER_DIRECTION * (markPrice - longOrderAssumingPrice))
  );

  // There is no "1 + imr" in article's formula, but i've added it during my own calculations
  // It seems like binance article is wrong
  const shortDiff = Math.abs(
    (1 + imr) *
      Math.min(0, SHORT_ORDER_DIRECTION * (markPrice - shortOrderAssumingPrice))
  );

  let maxLong =
    (balance + longAdditionalMargin) /
    (longOrderAssumingPrice / leverage + longDiff);

  // calculate maxNotional restrictions
  // note: in hedge mode you can have two different positions, but max notional value is used for SYMBOL, NOT UNIQUE POSITION
  const maxNotionalForLong =
    placeOrderMode === "OneWay"
      ? maxNotional + shortNotionalSize - longNotionalSize
      : maxNotional - shortNotionalSize - longNotionalSize;
  maxLong = Math.min(
    maxLong,
    Math.max(0, maxNotionalForLong) / longOrderAssumingPrice
  );

  // fix ui display
  maxLong = isFinite(maxLong) ? maxLong : 0;

  // apply reduceOnly
  maxLong = reduceOnly ? shortPositionQuantity : maxLong;

  let maxShort =
    (balance + shortAdditionalMargin) /
    (shortOrderAssumingPrice / leverage + shortDiff);

  // calculate maxNotional restrictions
  // note: in hedge mode you can have two different positions, but max notional value is used for SYMBOL, NOT UNIQUE POSITION
  const maxNotionalForShort =
    placeOrderMode === "OneWay"
      ? maxNotional + longNotionalSize - shortNotionalSize
      : maxNotional - shortNotionalSize - longNotionalSize;
  maxShort = Math.min(
    maxShort,
    // there is Math.max(orderPrice, markPrice) because orders execute at the best price
    // if orderPrice < markPrice then short order executes at markPrice
    Math.max(0, maxNotionalForShort) /
      Math.max(shortOrderAssumingPrice, markPrice)
  );

  // fix ui display
  maxShort = isFinite(maxShort) ? maxShort : 0;

  // apply reduceOnly
  maxShort = reduceOnly ? longPositionQuantity : maxShort;

  const sliderBuy = percentMode ? calculatePercentage(maxLong, quantity) : 0;
  const sliderSell = percentMode ? calculatePercentage(maxShort, quantity) : 0;

  const quantityLong = percentMode ? sliderBuy : quantity;
  const quantityShort = percentMode ? sliderSell : quantity;

  // Step 3: Calculate the Initial Margin
  const longInitialMargin = (longOrderAssumingPrice * quantityLong) / leverage;
  const shortInitialMargin =
    (shortOrderAssumingPrice * quantityShort) / leverage;

  const longOpenLoss = quantityLong * longDiff;
  const shortOpenLoss = quantityShort * shortDiff;

  // Step 4: Calculate the cost required to open a position
  // in one-way mode you have to consider opposite "side" to calculate cost
  const longCost = Math.max(
    0,
    longInitialMargin + longOpenLoss - longAdditionalMargin
  );
  const shortCost = Math.max(
    0,
    shortInitialMargin + shortOpenLoss - shortAdditionalMargin
  );

  return {
    longCost,
    shortCost,
    maxLong,
    maxShort,
    sliderBuy,
    sliderSell
  };
};

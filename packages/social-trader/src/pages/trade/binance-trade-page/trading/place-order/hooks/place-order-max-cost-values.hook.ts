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
  reduceOnly: redOnly
}: PlaceOrderMaxCostInputValues): PlaceOrderMaxCostOutputValues => {
  // TODO positions values! maybe from context
  // TODO reduceOnly
  const { markPrices } = useContext(TerminalTickerContext);
  const { openPositions } = useContext(TerminalFuturesPositionsContext);
  const { symbol, exchangeAccountId } = useContext(TerminalInfoContext);
  const { leverage, placeOrderMode } = useContext(TerminalPlaceOrderContext);
  const { bestAskPrice: bestAsk, bestBidPrice: bestBid } = useContext(
    TradingPriceContext
  );

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

  const reduceOnly = redOnly || placeOrderMode === "HedgeClose";
  const bestAskPrice = bestAsk ? bestAsk : 0;
  const bestBidPrice = bestBid ? bestBid : 0;
  const quantity = isNaN(+quan) ? 0 : +quan;

  const symbolPositions = openPositions.filter(
    pos => pos.symbol === getSymbolFromState(symbol)
  );

  const longPosition = symbolPositions.find(pos => pos.quantity > 0);
  const shortPosition = symbolPositions.find(pos => pos.quantity < 0);

  const mark = markPrices?.find(
    item => item.symbol === getSymbolFromState(symbol)
  );
  const markPrice = mark ? mark.markPrice : 0;

  // Step 1: Calculate assuming price
  const longOrderAssumingPrice = bestAskPrice * 1.0005;
  const shortOrderAssumingPrice = Math.max(bestBidPrice, markPrice);

  // Step 2: Calculate the Initial Margin
  const longInitialMargin = (longOrderAssumingPrice * quantity) / leverage;
  const shortInitialMargin = (shortOrderAssumingPrice * quantity) / leverage;

  // Step 3: Calculate Open Loss

  // MAYBE maxLongOpenLoss / quantity
  const longOpenLoss =
    quantity *
    Math.abs(
      Math.min(0, LONG_ORDER_DIRECTION * (markPrice - longOrderAssumingPrice))
    );
  const shortOpenLoss =
    quantity *
    Math.abs(
      Math.min(0, SHORT_ORDER_DIRECTION * (markPrice - shortOrderAssumingPrice))
    );

  // Step 4: Calculate the cost required to open a position
  const longCost = percentMode
    ? calculatePercentage(balance, quantity)
    : longInitialMargin + longOpenLoss;
  const shortCost = percentMode
    ? calculatePercentage(balance, quantity)
    : shortInitialMargin + shortOpenLoss;

  // other calculations
  const maxLongQuantity = balance / longOrderAssumingPrice;
  const maxShortQuantity = balance / shortOrderAssumingPrice;

  // const LONG_ORDER_DIRECTION = 1;
  // const SHORT_ORDER_DIRECTION = -1;

  // const balance = 11030.66;
  // const leverage = 20;
  // const orderPrice = 600;
  // const markPrice = 590.43;
  // const maxQuantity = balance / orderPrice;
  // const maxLongOpenLoss =
  //   maxQuantity *
  //   Math.abs(Math.min(0, LONG_ORDER_DIRECTION * (markPrice - orderPrice)));
  // const maxShortOpenLoss =
  //   maxQuantity *
  //   Math.abs(Math.min(0, SHORT_ORDER_DIRECTION * (markPrice - orderPrice)));

  // const maxLong = (balance * leverage) / (maxLongOpenLoss + orderPrice);
  // const maxShort = (balance * leverage) / (maxShortOpenLoss + orderPrice);

  // console.log(maxLong);
  // console.log(maxShort);

  const maxLongOpenLoss =
    maxLongQuantity *
    Math.abs(
      Math.min(0, LONG_ORDER_DIRECTION * (markPrice - longOrderAssumingPrice))
    );

  const maxShortOpenLoss =
    maxShortQuantity *
    Math.abs(
      Math.min(0, SHORT_ORDER_DIRECTION * (markPrice - shortOrderAssumingPrice))
    );

  const maxLong =
    (balance * leverage) / (maxLongOpenLoss + longOrderAssumingPrice);
  const maxShort =
    (balance * leverage) / (maxShortOpenLoss + shortOrderAssumingPrice);

  const sliderBuy = percentMode ? calculatePercentage(maxLong, quantity) : 0;
  const sliderSell = percentMode ? calculatePercentage(maxShort, quantity) : 0;

  return {
    longCost,
    shortCost,
    maxLong,
    maxShort,
    sliderBuy,
    sliderSell
  };
};

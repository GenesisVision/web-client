import { useContext } from "react";
import { calculatePercentage } from "utils/currency-converter";

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
  quantity: quan,
  orderPrice: price,
  reduceOnly: redOnly
}: PlaceOrderMaxCostInputValues & {
  orderPrice: number | string;
}): PlaceOrderMaxCostOutputValues => {
  // TODO positions values! maybe from context
  // TODO reduceOnly
  // Просчитать hedge и oneway mode, reduceOnly, хватает ли денег или нет
  const { markPrices } = useContext(TerminalTickerContext);
  const { openPositions } = useContext(TerminalFuturesPositionsContext);
  const { symbol } = useContext(TerminalInfoContext);
  const { leverage, placeOrderMode } = useContext(TerminalPlaceOrderContext);

  const reduceOnly = redOnly || placeOrderMode === "HedgeClose";

  const orderPrice = +price;

  const symbolPositions = openPositions.filter(
    pos => pos.symbol === getSymbolFromState(symbol)
  );

  const longPosition = symbolPositions.find(pos => pos.quantity > 0);
  const shortPosition = symbolPositions.find(pos => pos.quantity < 0);

  const mark = markPrices?.find(
    item => item.symbol === getSymbolFromState(symbol)
  );

  // поменять. Если нет orderPrice - price = 0 и дальше считать
  if (!orderPrice) {
    return {
      longCost: 0,
      shortCost: 0,
      maxLong: 0,
      maxShort: 0,
      sliderBuy: 0,
      sliderSell: 0
    };
  }

  const quantity = isNaN(+quan) ? 0 : +quan;
  const markPrice = mark ? mark.markPrice : 0;

  // Step 1: Calculate the Initial Margin
  const longInitialMargin = (orderPrice * quantity) / leverage;
  const shortInitialMargin = (orderPrice * quantity) / leverage;

  const imr = 1 / leverage;

  // Step 2: Calculate Open Loss
  const longOpenLoss =
    quantity *
    Math.abs(Math.min(0, LONG_ORDER_DIRECTION * (markPrice - orderPrice)));
  const shortOpenLoss =
    quantity *
    Math.abs(Math.min(0, SHORT_ORDER_DIRECTION * (markPrice - orderPrice)));

  // Step 3: Calculate the cost required to open a position
  const longCost = percentMode
    ? calculatePercentage(balance, quantity)
    : longInitialMargin + longOpenLoss;
  const shortCost = percentMode
    ? calculatePercentage(balance, quantity)
    : shortInitialMargin + shortOpenLoss;

  // other calculations
  const maxQuantity = balance / orderPrice;

  const maxLongOpenLoss =
    maxQuantity *
    Math.abs(Math.min(0, LONG_ORDER_DIRECTION * (markPrice - orderPrice)));

  const maxShortOpenLoss =
    maxQuantity *
    Math.abs(Math.min(0, SHORT_ORDER_DIRECTION * (markPrice - orderPrice)));

  const maxLong = reduceOnly
    ? shortPosition
      ? Math.abs(shortPosition.quantity)
      : 0
    : (balance * leverage) / (maxLongOpenLoss + orderPrice);

  const maxShort = reduceOnly
    ? longPosition
      ? longPosition.quantity
      : 0
    : (balance * leverage) / (maxShortOpenLoss + orderPrice);

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
  const { symbol } = useContext(TerminalInfoContext);
  const { leverage, placeOrderMode } = useContext(TerminalPlaceOrderContext);
  const { bestAskPrice: bestAsk, bestBidPrice: bestBid } = useContext(
    TradingPriceContext
  );

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

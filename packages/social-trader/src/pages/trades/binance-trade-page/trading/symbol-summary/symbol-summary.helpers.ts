import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { TradingTickerContext } from "pages/trades/binance-trade-page/trading/trading-ticker.context";
import { getSymbolFromState } from "pages/trades/binance-trade-page/trading/trading.helpers";
import { MergedTickerSymbolType } from "pages/trades/binance-trade-page/trading/trading.types";
import { useContext } from "react";
import { safeGetElemFromArray } from "utils/helpers";

export const useSymbolData = () => {
  const items = useContext(TradingTickerContext);
  const { symbol } = useContext(TradingInfoContext);
  const symbolData = items
    ? safeGetElemFromArray(
        items,
        item => item.symbol === getSymbolFromState(symbol)
      )
    : undefined;
  return { symbolData };
};

export const getTickerSymbolLoaderData = (): MergedTickerSymbolType => {
  return {
    baseAsset: "BTC",
    baseAssetPrecision: 0,
    baseCommissionPrecision: 0,
    filters: [],
    icebergAllowed: false,
    isMarginTradingAllowed: false,
    isSpotTradingAllowed: false,
    ocoAllowed: false,
    orderTypes: ["LIMIT"],
    quoteAsset: "USDT",
    quoteCommissionPrecision: 0,
    quoteOrderQtyMarketAllowed: false,
    quotePrecision: 0,
    status: "0",
    symbol: "BTCUSDT",
    eventType: "0",
    eventTime: 0,
    priceChange: "0",
    priceChangePercent: "0",
    weightedAvgPrice: "0",
    prevClosePrice: "0",
    lastPrice: "0",
    lastQty: "0",
    bestBid: "0",
    bestBidQnt: "0",
    bestAsk: "0",
    bestAskQnt: "0",
    open: "0",
    high: "0",
    low: "0",
    volume: "0",
    volumeQuote: "0",
    openTime: 0,
    closeTime: 0,
    firstTradeId: 0,
    lastTradeId: 0,
    totalTrades: 0
  };
};

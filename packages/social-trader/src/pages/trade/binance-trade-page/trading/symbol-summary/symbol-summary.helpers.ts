import useApiRequest from "hooks/api-request.hook";
import { useGetRate } from "hooks/get-rate.hook";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import { TerminalTickerContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-ticker.context";
import { getSymbolFromState } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import {
  SymbolSummaryData,
  TerminalType
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { useContext, useEffect } from "react";
import { safeGetElemFromArray } from "utils/helpers";

export const useSymbolData = (): SymbolSummaryData | undefined => {
  const { rate, getRate } = useGetRate();

  const { getServerTime } = useContext(TerminalMethodsContext);
  const { items, markPrices } = useContext(TerminalTickerContext);

  const { symbol, terminalType } = useContext(TerminalInfoContext);
  const isFutures = terminalType === "futures";
  const textSymbol = getSymbolFromState(symbol);
  const tickerData = items
    ? safeGetElemFromArray(items, item => item.symbol === textSymbol)
    : undefined;

  const markPrice = markPrices
    ? safeGetElemFromArray(markPrices, item => item.symbol === textSymbol)
    : undefined;

  const { data: serverTime } = useApiRequest({
    request: getServerTime,
    fetchOnMount: true
  });

  useEffect(() => {
    if (!isFutures) {
      getRate({ from: symbol.baseAsset, to: "USDT" });
    }
  }, [symbol, terminalType]);

  useEffect(() => {
    if (!isFutures) {
      getRate({ from: symbol.baseAsset, to: "USDT" });
    }
  }, [symbol, terminalType]);

  return tickerData
    ? {
        serverTime,
        tickerData,
        markPrice,
        usdRate: isFutures ? undefined : rate
      }
    : undefined;
};

export const getTickerSymbolLoaderData = (
  terminalType: TerminalType
): SymbolSummaryData => {
  const tickerData = {
    baseAsset: "BTC",
    baseAssetPrecision: 0,
    baseCommissionPrecision: 0,
    iceBergAllowed: false,
    isMarginTradingAllowed: false,
    isSpotTradingAllowed: false,
    ocoAllowed: false,
    orderTypes: ["Limit"],
    quoteAsset: "USDT",
    quoteCommissionPrecision: 0,
    status: "AuctionMatch",
    symbol: "BTCUSDT",
    eventTime: 0,
    priceChange: 0,
    priceChangePercent: 0,
    lastPrice: 0,
    lastQuantity: 0,
    bestBidQnt: "0",
    bestAsk: "0",
    bestAskQnt: "0",
    open: "0",
    high: "0",
    low: "0",
    volume: "0",
    volumeQuote: "0",
    openTime: new Date(),
    closeTime: new Date(),
    firstTradeId: 0,
    lastTradeId: 0,
    totalTrades: 0
  };

  if (terminalType === "futures") {
    return ({
      tickerData,
      markPrice: {
        symbol: "BTCUSDT",
        markPrice: 0,
        indexPrice: 0,
        fundingRate: 0,
        nextFundingTime: new Date(),
        time: new Date()
      }
    } as unknown) as SymbolSummaryData;
  }

  return ({
    tickerData
  } as unknown) as SymbolSummaryData;
};

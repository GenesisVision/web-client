import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import { TerminalTickerContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-ticker.context";
import { getSymbolFromState } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { MarkPrice, SymbolSummaryData } from "pages/trade/binance-trade-page/trading/terminal.types";
import { useContext, useEffect, useState } from "react";
import { useSockets } from "services/websocket.service";
import { safeGetElemFromArray } from "utils/helpers";
import { useGetRate } from "hooks/get-rate.hook";
import useApiRequest from "hooks/api-request.hook";

export const useSymbolData = (): SymbolSummaryData | undefined => {
  const { rate, getRate } = useGetRate();
  const { connectSocket } = useSockets();

  const [markPrice, setMarkPrice] = useState<MarkPrice | undefined>();

  const { getServerTime, markPriceSocket, getMarkPrice } = useContext(
    TerminalMethodsContext
  );
  const { items } = useContext(TerminalTickerContext);
  const { symbol, terminalType } = useContext(TerminalInfoContext);
  const textSymbol = getSymbolFromState(symbol);
  const tickerData = items
    ? safeGetElemFromArray(items, item => item.symbol === textSymbol)
    : undefined;

  const { data: serverTime } = useApiRequest({
    request: getServerTime,
    fetchOnMount: true
  });

  useEffect(() => {
    getRate({ from: symbol.baseAsset, to: "USDT" });
  }, [symbol]);

  useEffect(() => {
    if (!getMarkPrice) {
      setMarkPrice(undefined);
      return;
    }
    getMarkPrice({ symbol: textSymbol }).then(data => {
      setMarkPrice(data);
      markPriceSocket!(connectSocket, textSymbol).subscribe(data => {
        setMarkPrice({ ...markPrice, ...data });
      });
    });
  }, [getMarkPrice, symbol, terminalType]);

  return tickerData
    ? {
        serverTime,
        tickerData,
        markPrice,
        usdRate: rate
      }
    : undefined;
};

export const getTickerSymbolLoaderData = (): SymbolSummaryData => {
  return ({
    tickerData: {
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
    }
  } as unknown) as SymbolSummaryData;
};

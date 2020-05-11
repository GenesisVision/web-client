import { getKlines } from "pages/trades/binance-trade-page/services/binance-http.service";
import {
  Bar,
  IDatafeedChartApi,
  LibrarySymbolInfo,
  SeriesFormat,
  Timezone
} from "pages/trades/binance-trade-page/trading/chart/charting_library/datafeed-api";
import { Symbol } from "pages/trades/binance-trade-page/trading/trading.types";

const configurationData = {
  supported_resolutions: ["1D", "1W", "1M"],
  exchanges: [
    {
      value: "Binance",
      name: "Binance",
      desc: "Binance"
    }
  ],
  symbols_types: [
    {
      name: "crypto",
      value: "crypto"
    }
  ]
};
export default ({ symbols }: { symbols: Symbol[] }): IDatafeedChartApi => ({
  onReady: callback => {
    // console.log("[onReady]: Method call");
    setTimeout(() => callback(configurationData));
  },
  searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
    // console.info(userInput, exchange, symbolType, onResultReadyCallback);
    // console.info(symbols);
    return symbols.filter(sym => sym.baseAsset === userInput);
  },
  resolveSymbol: async (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback
  ) => {
    // console.log("[resolveSymbol]: Method call", symbolName);
    // const symbols = await getAllSymbols();
    const symbolItem = symbols.find(({ symbol }) => symbol === symbolName);
    // console.info(symbols, symbolName);
    if (!symbolItem) {
      // console.log("[resolveSymbol]: Cannot resolve symbol", symbolName);
      onResolveErrorCallback("cannot resolve symbol");
      return;
    }
    const symbolInfo: LibrarySymbolInfo = {
      name: `${symbolItem.baseAsset}/${symbolItem.quoteAsset}`,
      base_name: [symbolItem.baseAsset, symbolItem.quoteAsset],
      description: `Binance:${symbolItem.baseAsset}/${symbolItem.quoteAsset}`,
      type: "crypto",
      session: "24x7",
      timezone: "Etc/UTC" as Timezone,
      exchange: "crypto",
      minmov: 1,
      pricescale: 100,
      has_intraday: false,
      has_no_volume: true,
      has_weekly_and_monthly: false,
      supported_resolutions: configurationData.supported_resolutions,
      volume_precision: 2,
      data_status: symbolItem.status as any,
      full_name: symbolName,
      listed_exchange: "",
      format: "price" as SeriesFormat
    };
    //
    // console.log("[resolveSymbol]: Symbol resolved", symbolName);
    onSymbolResolvedCallback(symbolInfo);
  },
  getBars: async (
    symbolInfo,
    resolution,
    from,
    to,
    onHistoryCallback,
    onErrorCallback,
    firstDataRequest
  ) => {
    const fromms = from * 1000;
    const toms = to * 1000;
    const urlParameters = {
      symbol: symbolInfo.full_name,
      interval: resolution.toLowerCase(),
      startTime: fromms,
      endTime: toms
    };
    try {
      const data = await getKlines(urlParameters);

      let bars: Bar[] = [];
      data.forEach(bar => {
        if (bar[0] >= fromms && bar[0] < toms) {
          bars = [
            ...bars,
            {
              time: bar[0],
              open: bar[1],
              high: bar[2],
              low: bar[3],
              close: bar[4]
            }
          ];
        }
      });
      onHistoryCallback(bars, { noData: false });
    } catch (error) {
      console.log("[getBars]: Get error", error);
      onErrorCallback(error);
    }
  },
  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscribeUID,
    onResetCacheNeededCallback
  ) => {
    console.log(
      "[subscribeBars]: Method call with subscribeUID:",
      subscribeUID
    );
  },
  unsubscribeBars: subscriberUID => {
    console.log(
      "[unsubscribeBars]: Method call with subscriberUID:",
      subscriberUID
    );
  }
});

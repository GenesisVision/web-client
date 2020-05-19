import { getKlines } from "pages/trades/binance-trade-page/services/binance-http.service";
import { IBasicDataFeed } from "pages/trades/binance-trade-page/trading/chart/charting_library/charting_library.min";
import {
  Bar,
  LibrarySymbolInfo,
  SeriesFormat,
  Timezone
} from "pages/trades/binance-trade-page/trading/chart/charting_library/datafeed-api";
import {
  subscribeOnStream,
  unsubscribeFromStream
} from "pages/trades/binance-trade-page/trading/chart/streaming.js";
import { Symbol } from "pages/trades/binance-trade-page/trading/trading.types";

const formatTimeResolution = (resolution: string) => {
  if (resolution.match("M")) return resolution;
  if (resolution.match("D|W")) return resolution.toLowerCase();
  if (parseInt(resolution) >= 60) {
    return `${parseInt(resolution) / 60}h`;
  }
  return `${resolution}m`;
};

const configurationData = {
  supported_resolutions: [
    "1",
    "3",
    "5",
    "15",
    "30",
    "60",
    "120",
    "240",
    "360",
    "480",
    "720",
    "1D",
    "1W",
    "1M"
  ],
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

export default ({ symbols }: { symbols: Symbol[] }): IBasicDataFeed => ({
  //@ts-ignore
  onReady: callback => {
    setTimeout(() => callback(configurationData));
  },
  searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
    return symbols.filter(sym => sym.baseAsset === userInput);
  },
  resolveSymbol: async (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback
  ) => {
    const symbolItem = symbols.find(({ symbol }) => symbol === symbolName);
    if (!symbolItem) {
      onResolveErrorCallback("cannot resolve symbol");
      return;
    }
    const symbolInfo: LibrarySymbolInfo = {
      name: `${symbolItem.baseAsset}/${symbolItem.quoteAsset}`,
      //@ts-ignore
      base_name: [symbolItem.baseAsset, symbolItem.quoteAsset],
      description: `Binance:${symbolItem.baseAsset}/${symbolItem.quoteAsset}`,
      type: "crypto",
      session: "24x7",
      timezone: "Etc/UTC" as Timezone,
      exchange: "crypto",
      minmov: 1,
      pricescale: 100,
      has_intraday: true,
      has_no_volume: true,
      has_daily: true,
      has_weekly_and_monthly: true,
      supported_resolutions: configurationData.supported_resolutions,
      volume_precision: 2,
      data_status: symbolItem.status as any,
      full_name: symbolName,
      listed_exchange: "",
      format: "price" as SeriesFormat
    };
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
      interval: formatTimeResolution(resolution),
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
    const { full_name } = symbolInfo;

    subscribeOnStream(
      subscribeUID,
      full_name.toLowerCase(),
      formatTimeResolution(resolution),
      onRealtimeCallback
    );
  },
  unsubscribeBars: subscriberUID => {
    unsubscribeFromStream(subscriberUID);
  }
});

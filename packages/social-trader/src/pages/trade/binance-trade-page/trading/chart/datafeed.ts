import {
  IBasicDataFeed,
  SearchSymbolResultItem
} from "pages/trade/binance-trade-page/trading/chart/charting_library/charting_library.min";
import {
  Bar,
  LibrarySymbolInfo,
  SeriesFormat,
  ServerTimeCallback,
  Timezone
} from "pages/trade/binance-trade-page/trading/chart/charting_library/datafeed-api";
import {
  KlineParams,
  KlineSocketType,
  Symbol
} from "pages/trade/binance-trade-page/trading/terminal.types";

const formatTimeResolution = (resolution: string) => {
  const time: { [key: string]: string } = {
    "1": "1m",
    "3": "3m",
    "5": "5m",
    "15": "15m",
    "30": "30m",
    "60": "1h",
    "120": "2h",
    "240": "4h",
    "360": "6h",
    "720": "12h",
    "1D": "1d",
    "1W": "1w",
    "1M": "1M"
  };
  return time[resolution];
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

type Params = {
  getServerTime: () => Promise<{ serverTime: number }>;
  symbols: Symbol[];
  getKlines: (params: KlineParams) => Promise<Bar[]>;
  klineSocket: KlineSocketType;
};

export default ({
  getServerTime,
  symbols,
  getKlines,
  klineSocket
}: Params): IBasicDataFeed => ({
  getServerTime: async (callback: ServerTimeCallback) => {
    try {
      const { serverTime } = await getServerTime();
      setTimeout(() => {
        callback(Math.floor(serverTime / 1000));
      }, 0);
    } catch (e) {}
  },
  onReady: callback => {
    setTimeout(() => callback(configurationData));
  },
  searchSymbols: async (userInput, exchange, type, onResultReadyCallback) => {
    const items: SearchSymbolResultItem[] = symbols
      .filter(sym => sym.baseAsset === userInput)
      .map(symbolItem => ({
        symbol: symbolItem.symbol,
        full_name: symbolItem.symbol,
        description: `Binance:${symbolItem.baseAsset}/${symbolItem.quoteAsset}`,
        exchange,
        type,
        ticker: symbolItem.symbol
      }));
    setTimeout(() => onResultReadyCallback(items));
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

    const filters = symbolItem.filters.find(function(e) {
      //@ts-ignore
      return e.tickSize || e.stepSize;
    });

    //@ts-ignore;
    const size = filters.stepSize || filters.tickSize;

    const symbolInfo: LibrarySymbolInfo = {
      name: `${symbolItem.baseAsset}/${symbolItem.quoteAsset}`,
      //@ts-ignore
      base_name: [symbolItem.baseAsset, symbolItem.quoteAsset],
      description: `Binance:${symbolItem.baseAsset}/${symbolItem.quoteAsset}`,
      type: "crypto",
      session: "24x7",
      timezone: "Asia/Shanghai" as Timezone,
      exchange: "Binance",
      minmov: 1,
      minmove2: 0,
      fractional: false,
      pricescale: Math.pow(10, Math.abs(Math.log10(size))),
      has_intraday: true,
      has_no_volume: true,
      has_daily: true,
      has_weekly_and_monthly: true,
      supported_resolutions: configurationData.supported_resolutions,
      volume_precision: 2,
      data_status: "streaming",
      full_name: symbolName,
      listed_exchange: "",
      format: "price" as SeriesFormat
    };
    setTimeout(() => {
      onSymbolResolvedCallback(symbolInfo);
    }, 0);
  },
  getBars: async (
    symbolInfo,
    resolution,
    from,
    to,
    onHistoryCallback,
    onErrorCallback
  ) => {
    const startTime = from * 1000;
    const endTime = to * 1000;
    const limit = 1000;
    const interval = formatTimeResolution(resolution);

    const urlParameters = {
      symbol: symbolInfo.full_name,
      interval,
      startTime,
      endTime,
      limit
    };

    try {
      const bars = await getKlines(urlParameters);

      if (bars.length > 0) {
        onHistoryCallback(bars, { noData: false });
      } else {
        onHistoryCallback(bars, { noData: true });
      }
    } catch (error) {
      onErrorCallback(error);
    }
  },
  subscribeBars: (symbolInfo, resolution, onRealtimeCallback) => {
    const { full_name } = symbolInfo;
    klineSocket(
      full_name.toLowerCase(),
      formatTimeResolution(resolution)
    ).subscribe(data => {
      onRealtimeCallback(data);
    });
  },
  unsubscribeBars: () => {}
});

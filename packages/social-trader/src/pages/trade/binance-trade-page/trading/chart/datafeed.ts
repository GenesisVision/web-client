import { BinanceRawKlineInterval } from "gv-api-web";
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

const formatTimeResolution = (resolution: string): BinanceRawKlineInterval => {
  const time: { [key: string]: BinanceRawKlineInterval } = {
    "1": "OneMinute",
    "3": "ThreeMinutes",
    "5": "FiveMinutes",
    "15": "FifteenMinutes",
    "30": "ThirtyMinutes",
    "60": "OneHour",
    "120": "TwoHour",
    "240": "FourHour",
    "360": "SixHour",
    "720": "TwelveHour",
    "1D": "OneDay",
    "3D": "ThreeDay",
    "1W": "OneWeek",
    "1M": "OneMonth"
  };
  return time[resolution];
};

const formatTimeResolutionBinance = (resolution: string) => {
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
  getServerTime: () => Promise<{ date: number }>;
  symbols: Symbol[];
  getKlines: (params: KlineParams) => Promise<Bar[]>;
  klineSocket: KlineSocketType;
};

export const Datafeed = ({
  getServerTime,
  symbols,
  getKlines,
  klineSocket
}: Params): IBasicDataFeed => ({
  getServerTime: async (callback: ServerTimeCallback) => {
    try {
      const { date } = await getServerTime();
      setTimeout(() => {
        callback(date);
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
        symbol: symbolItem.name,
        full_name: symbolItem.name,
        description: `Binance:${symbolItem.baseAsset}/${symbolItem.quoteAsset}`,
        exchange,
        type,
        ticker: symbolItem.name
      }));
    setTimeout(() => onResultReadyCallback(items));
  },
  resolveSymbol: async (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback
  ) => {
    const symbolItem = symbols.find(({ name }) => name === symbolName);
    if (!symbolItem) {
      onResolveErrorCallback("cannot resolve symbol");
      return;
    }
    const { tickSize } = symbolItem.priceFilter;

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
      pricescale: Math.pow(10, Math.abs(Math.log10(tickSize))),
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
    const interval = formatTimeResolutionBinance(resolution);
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
      formatTimeResolutionBinance(resolution)
    ).subscribe(data => {
      onRealtimeCallback(data);
    });
  },
  unsubscribeBars: () => {}
});

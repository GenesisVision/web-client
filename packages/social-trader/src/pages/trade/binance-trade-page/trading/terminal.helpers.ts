import { ColoredTextColor } from "components/colored-text/colored-text";
import { Push } from "components/link/link";
import { BinanceOrderSide, BinancePositionSide } from "gv-api-web";
import { useParams } from "hooks/location";
import { TFunction } from "i18next";
import { Bar } from "pages/trade/binance-trade-page/trading/chart/charting_library/datafeed-api";
import { terminalMoneyFormat } from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { getDividerParts } from "pages/trade/binance-trade-page/trading/order-book/order-book.helpers";
import {
  Account,
  AssetBalance,
  ExchangeInfo,
  FuturesOrder,
  FuturesOrderType,
  MergedTickerSymbolType,
  Position,
  SymbolState,
  TerminalCurrency,
  UnitedOrder
} from "pages/trade/binance-trade-page/trading/terminal.types";
import qs from "qs";
import { useCallback } from "react";
import { TERMINAL_FOLDER_ROUTE, TERMINAL_ROUTE } from "routes/trade.routes";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { formatValue } from "utils/formatter";
import { changeLocation, safeGetElemFromArray } from "utils/helpers";
import { getLocation } from "utils/location";
import { AnyObjectType } from "utils/types";

export const TERMINAL_ROUTE_SYMBOL_SEPARATOR = "_";

export const DEFAULT_SYMBOL: SymbolState = {
  baseAsset: "BTC",
  quoteAsset: "USDT"
};

export const setUpperFirstLetter = ([firstLetter, ...rest]: string = "") =>
  firstLetter.toUpperCase() + rest.join("").toLowerCase();

export const generateSpotOrderMessage = (
  order: UnitedOrder,
  symbol: MergedTickerSymbolType
): string => {
  const { stepSize } = symbol.lotSizeFilter;
  const orderType = setUpperFirstLetter(order.type).split("_").join(" ");
  const executionTypeTitle =
    order.executionType?.toLowerCase() === "new"
      ? "Created"
      : order.executionType?.toLowerCase() === "trade"
      ? "filled"
      : order.executionType;
  const executionTypeDescription =
    order.executionType?.toLowerCase() === "new"
      ? "Submitted"
      : order.executionType?.toLowerCase() === "trade"
      ? "filled"
      : order.executionType;
  return `${orderType} ${order.side.toLowerCase()} order ${executionTypeTitle?.toLowerCase()}\n\n${setUpperFirstLetter(
    executionTypeDescription
  )} exchange ${orderType.toLowerCase()} ${order.side.toLowerCase()} order for ${terminalMoneyFormat(
    {
      amount: order.quantity,
      tickSize: String(stepSize)
    }
  )} ${symbol.baseAsset} by using ${symbol.quoteAsset}`;
};

export const generateFuturesOrderMessage = (
  order: FuturesOrder,
  symbol: MergedTickerSymbolType,
  t: TFunction
): string => {
  const { stepSize } = symbol.lotSizeFilter;
  console.log(order, "order");
  const orderType = getFuturesTypeLabel(t, order.type);
  const orderSide = getFuturesOpenOrderSideLabel(
    t,
    order.positionSide,
    order.side
  );
  const executionTypeTitle =
    order.executionType?.toLowerCase() === "new"
      ? "Created"
      : order.executionType?.toLowerCase() === "trade"
      ? "filled"
      : order.executionType;
  const executionTypeDescription =
    order.executionType?.toLowerCase() === "new"
      ? "Submitted"
      : order.executionType?.toLowerCase() === "trade"
      ? "filled"
      : order.executionType;
  return `${orderType} ${orderSide} order ${executionTypeTitle?.toLowerCase()}\n\n${setUpperFirstLetter(
    executionTypeDescription
  )} exchange ${orderType.toLowerCase()} ${orderSide.toLowerCase()} order for ${terminalMoneyFormat(
    {
      amount: order.quantity,
      tickSize: String(stepSize)
    }
  )} ${symbol.baseAsset} by using ${symbol.quoteAsset}`;
};

export const getSymbolData = (
  symbolList: MergedTickerSymbolType[],
  symbol: string
): SymbolState | undefined => {
  const symbolData = symbolList.find(data => data.symbol === symbol);
  if (!symbolData) return;
  return { baseAsset: symbolData.baseAsset, quoteAsset: symbolData.quoteAsset };
};

const updateUrl = ({
  reloadPage,
  parsedParams,
  updates,
  url
}: {
  reloadPage?: boolean;
  url: string;
  updates?: Object;
  parsedParams: AnyObjectType | null;
}) => {
  const updatedParams = qs.stringify({ ...parsedParams, ...updates });
  const ulrWithParams = `${TERMINAL_ROUTE}/${url}${
    updatedParams.length ? `?${updatedParams}` : ""
  }`;
  if (reloadPage) Push(TERMINAL_FOLDER_ROUTE, ulrWithParams);
  else changeLocation(ulrWithParams);
};

export const updateTerminalUrl = (url: string, updates?: Object) => {
  const params = getLocation().search.slice(1);
  const parsedParams = qs.parse(params || "");
  updateUrl({ parsedParams, updates, url, reloadPage: true });
};

export const useUpdateTerminalUrlParams = () => {
  const { parsedParams } = useParams();
  const handleUpdate = useCallback(
    ({
      reloadPage,
      url,
      updates
    }: {
      reloadPage?: boolean;
      url: string;
      updates?: Object;
    }) => {
      updateUrl({ parsedParams, updates, url, reloadPage });
    },
    [parsedParams]
  );
  return { updateUrl: handleUpdate };
};

export const transformKline = (data: string[]): Bar => ({
  time: parseInt(data[0]),
  open: parseFloat(data[1]),
  high: parseFloat(data[2]),
  low: parseFloat(data[3]),
  close: parseFloat(data[4]),
  volume: parseFloat(data[5])
});

export const transformKlineWrapper = async (promise: Promise<string[][]>) => {
  const value = await promise;
  return value.map(transformKline);
};

export const getSymbolFilters = (
  exchangeInfo: ExchangeInfo,
  symbol: string
) => {
  const {
    iceBergPartsFilter,
    lotSizeFilter,
    marketLotSizeFilter,
    maxAlgorithmicOrdersFilter,
    maxOrdersFilter,
    minNotionalFilter,
    priceFilter,
    pricePercentFilter
  } = safeGetElemFromArray(exchangeInfo.symbols, item => item.name === symbol);
  return {
    iceBergPartsFilter,
    lotSizeFilter,
    marketLotSizeFilter,
    maxAlgorithmicOrdersFilter,
    maxOrdersFilter,
    minNotionalFilter,
    priceFilter,
    pricePercentFilter
  };
};

export const USER_STREAM_ACCOUNT_UPDATE_EVENT_TYPE = "outboundAccountPosition";

export const filterOutboundAccountInfoStream = (
  userStream: Observable<any>
): Observable<Account> =>
  userStream.pipe(
    filter(info => info.eventType === USER_STREAM_ACCOUNT_UPDATE_EVENT_TYPE)
  );

export const filterOrderEventsStream = (
  userStream: Observable<any>
): Observable<UnitedOrder | FuturesOrder> =>
  userStream.pipe(
    filter(
      info =>
        info.eventType === "executionReport" ||
        info.eventType === "ORDER_TRADE_UPDATE"
    )
  );

const normalizeBalanceList = (
  list: AssetBalance[]
): { [keys: string]: AssetBalance } => {
  const initObject: AnyObjectType = {};
  list.forEach(item => (initObject[item.asset] = item));
  return initObject;
};

const normalizePositionsList = (
  list: Position[]
): { [keys: string]: Position } => {
  const initObject: AnyObjectType = {};
  list.forEach(item => {
    if (!initObject[item.symbol]) initObject[item.symbol] = {};
    initObject[item.symbol][item.positionSide] = item;
  });
  return initObject;
};

const flatNormalizedPositions = (positions: {
  [keys: string]: Position;
}): Position[] => {
  return Object.values(positions)
    .map(item => Object.values(item))
    .flat();
};

export const mergePositions = (initialPosition, newPositions) => {
  const normalizedCurrentPositions = normalizePositionsList(initialPosition);
  const normalizedUpdatesPositions = normalizePositionsList(newPositions);

  const positions = flatNormalizedPositions(
    updatePositionList(normalizedCurrentPositions, normalizedUpdatesPositions)
  );

  return positions;
};

const updatePositionList = (
  list: AnyObjectType,
  updates: AnyObjectType
): AnyObjectType => {
  const updatedList = JSON.parse(JSON.stringify(list));
  Object.entries(updates).forEach(([symbol, data]) => {
    Object.keys(data).forEach(side => {
      if (!updatedList[symbol]?.[side]) return;
      updatedList[symbol][side] = {
        ...updatedList[symbol][side],
        ...updates[symbol][side]
      };
    });
  });
  return updatedList;
};

const updateBalancesList = (
  list: AnyObjectType,
  updates: AnyObjectType
): AnyObjectType => {
  const updatedList = { ...list };
  Object.entries(updates).forEach(([symbol, data]) => {
    updatedList[symbol] = {
      ...updatedList[symbol],
      ...data,
      newAmountInCurrency: updatedList[symbol]?.newAmountInCurrency
    };
  });
  return updatedList;
};

export const updateAccountInfo = (currentData: Account, updates: Account) => {
  const normalizedCurrentBalances = normalizeBalanceList(currentData.balances);
  const normalizedUpdatesBalances = normalizeBalanceList(
    updates.balances || []
  );
  const balances = Object.values(
    updateBalancesList(normalizedCurrentBalances, normalizedUpdatesBalances)
  );

  // const normalizedCurrentPositions = normalizePositionsList(
  //   currentData.positions || []
  // );
  // const normalizedUpdatesPositions = normalizePositionsList(
  //   updates.positions || []
  // );

  // const positions = flatNormalizedPositions(
  //   updatePositionList(normalizedCurrentPositions, normalizedUpdatesPositions)
  // );

  return { ...currentData, ...updates, balances };
};

export const stringifySymbolFromToParam = (symbol: SymbolState): string => {
  return [symbol.baseAsset, symbol.quoteAsset].join(
    TERMINAL_ROUTE_SYMBOL_SEPARATOR
  );
};

export const parseSymbolFromUrlParam = (param: string): SymbolState => {
  const splittedValue = param.split(TERMINAL_ROUTE_SYMBOL_SEPARATOR);
  return splittedValue.length > 1
    ? {
        baseAsset: splittedValue[0].toUpperCase(),
        quoteAsset: splittedValue[1].toUpperCase()
      }
    : DEFAULT_SYMBOL;
};

export const getTextColor = (value: number): ColoredTextColor | undefined => {
  if (value > 0) return "green";
  if (value < 0) return "red";
  return;
};

export const getSymbolFromState = ({
  quoteAsset,
  baseAsset
}: SymbolState): string => getSymbol(baseAsset, quoteAsset);

export const getSymbol = (
  base: TerminalCurrency,
  quote: TerminalCurrency
): string => base + quote;

export const getDecimalScale = (tick: string): number =>
  getDividerParts(tick).fracLength || 0;

export const formatValueWithTick = (value: any, tick: string): string => {
  const decimalScale = getDecimalScale(formatValue(tick));
  return formatValue(value, decimalScale);
};

export const extractFuturesSymbolStateFromString = (
  symbol: string
): SymbolState => {
  try {
    // FIX IT. It only works if quoteAsset is equal to USDT
    const baseCurrencies = /(.*)(USDT)/;
    const [baseAsset, quoteAsset]: any = baseCurrencies.exec(symbol)?.slice(1);
    return {
      baseAsset,
      quoteAsset
    };
  } catch (e) {
    console.log(e, "cannot extract symbolState from string");
    return {
      baseAsset: "",
      quoteAsset: ""
    };
  }
};

export const getFuturesTypeLabel = (
  t: TFunction,
  type: FuturesOrderType
): string => {
  switch (type) {
    case "Limit":
      return t("Limit");
    case "Stop":
      return t("Stop Limit");
    case "Market":
      return t("Market");
    case "StopMarket":
      return t("Stop Market");
    case "TakeProfit":
      return t("Take Profit");
    case "TakeProfitMarket":
      return t("Take Profit Market");
    case "TrailingStopMarket":
      return t("Trailing Stop");
    default:
      return "";
  }
};

export const getFuturesOpenOrderSideLabel = (
  t: TFunction,
  positionSide: BinancePositionSide,
  side: BinanceOrderSide
): string => {
  if (side === "Buy") {
    if (positionSide === "Long") {
      return t("Open Long");
    } else if (positionSide === "Short") {
      return t("Close Short");
    } else {
      return t("Buy");
    }
  } else {
    if (positionSide === "Short") {
      return t("Open Short");
    } else if (positionSide === "Long") {
      return t("Close Long");
    } else {
      return t("Sell");
    }
  }
};

import { ColoredTextColor } from "components/colored-text/colored-text";
import { useCookieState } from "hooks/cookie-state";
import { NextPageContext } from "next";
import { getDividerParts } from "pages/trades/binance-trade-page/trading/order-book/order-book.helpers";
import { SymbolState } from "pages/trades/binance-trade-page/trading/trading-info.context";
import {
  Account,
  AssetBalance,
  ExchangeInfo,
  ExecutionReport,
  SymbolFilter,
  TradeAuthDataType,
  TradeCurrency
} from "pages/trades/binance-trade-page/trading/trading.types";
import { useEffect, useState } from "react";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { cookieServiceCreator } from "utils/cookie-service.creator";
import { formatValue } from "utils/formatter";
import { safeGetElemFromArray } from "utils/helpers";
import { AnyObjectType } from "utils/types";

export const TERMINAL_ROUTE_SYMBOL_SEPARATOR = "_";

export const DEFAULT_SYMBOL: SymbolState = {
  baseAsset: "BTC",
  quoteAsset: "USDT"
};
const TRADE_AUTH_DATA_KEY = "TRADE_AUTH_DATA_KEY";
const initialState = { publicKey: "", privateKey: "" };

export const getSymbolFilters = (
  exchangeInfo: ExchangeInfo,
  symbol: string
): SymbolFilter[] => {
  return safeGetElemFromArray(
    exchangeInfo.symbols,
    item => item.symbol === symbol
  ).filters;
};

export const authCookieService = (ctx?: NextPageContext) =>
  cookieServiceCreator({
    ctx,
    key: TRADE_AUTH_DATA_KEY,
    initialState,
    parse: true
  });

export const useAuthCookieState = () => authCookieService();

export const useTradeAuth = () => {
  const [authData, setAuthData] = useState(initialState);
  const { set, get } = useAuthCookieState();
  useEffect(() => {
    setAuthData(get());
  }, []);
  return {
    set: (values: TradeAuthDataType) => {
      setAuthData(values);
      set(values);
    },
    authData
  };
};

export const filterOutboundAccountInfoStream = (
  userStream: Observable<any>
): Observable<Account> =>
  userStream.pipe(filter(info => info.eventType === "outboundAccountInfo"));

export const filterOrderEventsStream = (
  userStream: Observable<any>
): Observable<ExecutionReport> =>
  userStream.pipe(filter(info => info.eventType === "executionReport"));

const normalizeBalanceList = (
  list: AssetBalance[]
): { [keys: string]: AssetBalance } => {
  const initObject: AnyObjectType = {};
  list.forEach(item => (initObject[item.asset] = item));
  return initObject;
};

export const updateAccountInfo = (currentData: Account, updates: Account) => {
  const normalizedCurrentBalances = normalizeBalanceList(currentData.balances);
  const normalizedUpdatesBalances = normalizeBalanceList(
    updates.balances || []
  );
  const balances = Object.values({
    ...normalizedCurrentBalances,
    ...normalizedUpdatesBalances
  });
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
    ? { baseAsset: splittedValue[0], quoteAsset: splittedValue[1] }
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

export const getSymbol = (base: TradeCurrency, quote: TradeCurrency): string =>
  base + quote;

export const getDecimalScale = (tick: string): number =>
  getDividerParts(tick).fracLength || 0;

export const formatValueWithTick = (value: any, tick: string): string => {
  const decimalScale = getDecimalScale(formatValue(tick));
  return formatValue(value, decimalScale, false, { cleanNulls: false });
};

import { ColoredTextColor } from "components/colored-text/colored-text";
import { getDividerParts } from "pages/trades/binance-trade-page/trading/order-book/order-book.helpers";
import {
  transformExecutionReport,
  transformOutboundAccountInfo
} from "pages/trades/binance-trade-page/trading/services/binance-ws.helpers";
import { SymbolState } from "pages/trades/binance-trade-page/trading/trading-info.context";
import {
  Account,
  AssetBalance,
  ExecutionReport,
  TradeCurrency
} from "pages/trades/binance-trade-page/trading/trading.types";
import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { formatValue } from "utils/formatter";
import { AnyObjectType } from "utils/types";

export const DEFAULT_SYMBOL: SymbolState = {
  baseAsset: "BTC",
  quoteAsset: "USDT"
};

export const filterOutboundAccountInfoStream = (
  userStream: Observable<any>
): Observable<Account> =>
  userStream.pipe(
    filter(info => info.e === "outboundAccountInfo"),
    map(transformOutboundAccountInfo)
  );

export const filterOrderEventsStream = (
  userStream: Observable<any>
): Observable<ExecutionReport> =>
  userStream.pipe(
    filter(info => info.e === "executionReport"),
    map(transformExecutionReport)
  );

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

export const parseSymbolFromUrlParam = (param: string): SymbolState => {
  const splittedValue = param.split("_");
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

export const formatValueWithTick = (value: any, tick: string): string => {
  const decimalScale = getDividerParts(formatValue(tick)).fracLength;
  return formatValue(value, decimalScale);
};

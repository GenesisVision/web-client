import { SortingColumn } from "components/table/components/filtering/filter.type";
import { getSymbolPrice } from "pages/trades/binance-trade-page/trading/trade/trade.helpers";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { getSymbol } from "pages/trades/binance-trade-page/trading/trading.helpers";
import {
  NormalizedDepthList,
  StringBidDepth
} from "pages/trades/binance-trade-page/trading/trading.types";
import { useContext } from "react";
import { safeGetElemFromArray } from "utils/helpers";
import { AnyObjectType } from "utils/types";

export const useSymbolTick = () => {
  const {
    exchangeInfo,
    symbol: { baseAsset, quoteAsset }
  } = useContext(TradingInfoContext);
  if (!exchangeInfo) return;

  const { filters } = safeGetElemFromArray(
    exchangeInfo!.symbols,
    symbol => symbol.symbol === getSymbol(baseAsset, quoteAsset)
  );
  const { tickSize } = getSymbolPrice(filters);
  return tickSize;
};

export const getTickValues = (tick: number) => [
  String(tick),
  String(tick * 10),
  String(tick * 100),
  String(tick * 1000)
];

export const updateDepthList = (
  list: NormalizedDepthList,
  newDataList: StringBidDepth[]
): NormalizedDepthList => {
  const updatedList: NormalizedDepthList = { ...list };
  newDataList.forEach(([price, amount]) => {
    if (+amount === 0) delete updatedList[price];
    else updatedList[price] = [price, amount];
  });
  return updatedList;
};

export const normalizeDepthList = (
  list: StringBidDepth[]
): NormalizedDepthList => {
  const initObject: AnyObjectType = {};
  list.forEach(item => (initObject[item[0]] = item));
  return initObject;
};

export const ORDER_BOOK_COLUMNS: SortingColumn[] = [
  { name: "price" },
  { name: "amount" },
  { name: "total" }
];

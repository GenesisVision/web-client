import { SortingColumn } from "components/table/components/filtering/filter.type";
import { getSymbolPriceFilter } from "pages/trades/binance-trade-page/trading/trade/trade.helpers";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { getSymbol } from "pages/trades/binance-trade-page/trading/trading.helpers";
import {
  NormalizedDepthList,
  StringBidDepth
} from "pages/trades/binance-trade-page/trading/trading.types";
import { useContext } from "react";
import { formatValue } from "utils/formatter";
import { safeGetElemFromArray } from "utils/helpers";
import { AnyObjectType } from "utils/types";

type DividerPartsType = { intLength?: number; fracLength?: number };

export const getDividerParts = (
  divider: string = "0.00001"
): DividerPartsType => {
  const dottedDivider = divider.trim().split(".");
  const intLength = dottedDivider.length > 1 ? undefined : divider.length;
  const fracLength =
    dottedDivider.length > 1 ? dottedDivider[1].length : undefined;
  return { intLength, fracLength };
};

const getNewPriceWithDivider = (
  price: string,
  { intLength, fracLength }: DividerPartsType
): string => {
  const [int, frac] = price.split(".");
  if (fracLength) return [int, frac.slice(0, fracLength)].join(".");
  if (intLength)
    return int.slice(0, int.length - intLength + 1) + "0".repeat(intLength - 1);
  return price;
};

export const collapseItems = (
  items: { [keys: string]: StringBidDepth },
  dividerParts: DividerPartsType
): { [keys: string]: StringBidDepth } => {
  const collapsedItems: { [keys: string]: any } = {};
  Object.values(items).forEach(([price, amount]) => {
    const newPrice = getNewPriceWithDivider(price, dividerParts);
    if (collapsedItems[newPrice]) {
      collapsedItems[newPrice] = [
        newPrice,
        +collapsedItems[newPrice][1] + +amount
      ];
    } else collapsedItems[newPrice] = [newPrice, amount];
  });
  return collapsedItems;
};

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
  const { tickSize } = getSymbolPriceFilter(filters);
  return tickSize;
};

export const getTickValues = (tick: number) => [
  formatValue(tick),
  formatValue(tick * 10),
  formatValue(tick * 100),
  formatValue(tick * 1000)
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

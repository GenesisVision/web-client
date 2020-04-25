import { SortingColumn } from "components/table/components/filtering/filter.type";
import {
  NormalizedDepthList,
  StringBidDepth
} from "pages/trades/binance-trade-page/trading/trading.types";
import { AnyObjectType } from "utils/types";

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

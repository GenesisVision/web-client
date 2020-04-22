import { SORTING_DIRECTION } from "components/table/helpers/sorting.helpers";
import { Ticker } from "pages/trades/binance-trade-page/trading/trading.types";
import { AnyObjectType } from "utils/types";

export const normalizeMarketList = (list: Ticker[]) => {
  const initObject: AnyObjectType = {};
  list.forEach(item => (initObject[item.symbol] = item));
  return initObject;
};

const getCorrectValue = (value: string | number) => {
  return typeof value === "string" ? value.toLowerCase() : value;
};

export const sortMarketWatchItems = (
  field?: keyof Ticker,
  direction: SORTING_DIRECTION = SORTING_DIRECTION.NONE
) => (a: Ticker, b: Ticker): number => {
  if (!field) return 0;
  const correctA = getCorrectValue(a[field]);
  const correctB = getCorrectValue(b[field]);
  // console.log(correctA, correctB);
  switch (direction) {
    case SORTING_DIRECTION.ASC:
      if (correctA < correctB) return -1;
      else return 1;
    case SORTING_DIRECTION.DESC:
      if (correctA > correctB) return -1;
      else return 1;
    case SORTING_DIRECTION.NONE:
      return 0;
  }
};

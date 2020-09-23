import { SortingColumn } from "components/table/components/filtering/filter.type";
import { FuturesPositionInformation } from "pages/trade/binance-trade-page/trading/terminal.types";
import { AnyObjectType } from "utils/types";

export const normalizePositionsList = (list: FuturesPositionInformation[]) => {
  const initObject: AnyObjectType = {};
  list.forEach(item => (initObject[item.positionSide] = item));
  return initObject;
};

export const POSITIONS_TABLE_COLUMNS: SortingColumn[] = [
  {
    name: "symbol"
  },
  {
    name: "size"
  },
  {
    name: "entry-price"
  },
  {
    name: "mark-price"
  },
  {
    name: "liq-price"
  },
  {
    name: "margin-ratio"
  },
  {
    name: "margin"
  },
  {
    name: "pnl"
  },
  {
    name: "close-position"
  }
];

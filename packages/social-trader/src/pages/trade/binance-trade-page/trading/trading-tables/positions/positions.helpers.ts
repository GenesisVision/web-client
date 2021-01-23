import { SortingColumn } from "components/table/components/filtering/filter.type";
import { FuturesPositionInformation } from "pages/trade/binance-trade-page/trading/terminal.types";
import { AnyObjectType } from "utils/types";
import { BinanceRawFuturesAccountPosition } from "gv-api-web";
import { FuturesAccountEventPosition } from "pages/trade/binance-trade-page/services/futures/binance-futures.types";

export const mapBinanceRawFuturesAccountPositionToFuturesPositionInformation = ({
  isolated,
  leverage,
  symbol,
  unrealizedProfit,
  positionSide,
  entryPrice,
  maxNotional,
  positionAmount
}: BinanceRawFuturesAccountPosition): FuturesPositionInformation => ({
  entryPrice,
  marginType: isolated ? "Isolated" : "Cross",
  isAutoAddMargin: true,
  isolatedMargin: 0,
  leverage,
  liquidationPrice: 0,
  markPrice: 0,
  maxNotionalValue: maxNotional,
  positionAmt: positionAmount,
  symbol,
  unRealizedProfit: unrealizedProfit,
  positionSide
});

export const normalizePositionsList = (
  list: Array<FuturesPositionInformation | FuturesAccountEventPosition>
) => {
  const initObject: AnyObjectType = {};
  list.forEach(item => (initObject[item.positionSide] = item));
  return initObject;
};

export const updateList = (
  list: AnyObjectType,
  updates: AnyObjectType
): AnyObjectType => {
  const updatedList = { ...list };
  Object.keys(updates).forEach(key => {
    updatedList[key] = { ...list[key], ...updates[key] };
  });
  return updatedList;
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
  }
];

import { SortingColumn } from "components/table/components/filtering/filter.type";
import {
  Depth,
  NormalizedDepth,
  NormalizedDepthList,
  StringBidDepth,
  TerminalType
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { formatValue } from "utils/formatter";
import { AnyObjectType } from "utils/types";

export type DividerPartsType = { intLength?: number; fracLength?: number };

export const ORDER_BOOK_ROW_HEIGHT = 16;

export const isOrderInLine = ({
  i,
  items,
  limitOrders,
  price,
  reverse
}: {
  i: number;
  items: StringBidDepth[];
  limitOrders: number[];
  price: string;
  reverse?: boolean;
}) => {
  if (reverse) {
    return i === items.length - 1
      ? !!limitOrders.find(limitOrderPrice => {
          return limitOrderPrice <= +price;
        })
      : !!limitOrders.find(limitOrderPrice => {
          return (
            limitOrderPrice > +items[i + 1][0] && limitOrderPrice <= +price
          );
        });
  }
  return i === 0
    ? !!limitOrders.find(limitOrderPrice => {
        return limitOrderPrice >= +price;
      })
    : !!limitOrders.find(limitOrderPrice => {
        return limitOrderPrice < +items[i - 1][0] && limitOrderPrice >= +price;
      });
};

export const sortDepthList = (
  [priceA]: StringBidDepth,
  [priceB]: StringBidDepth
): number => {
  return +priceB - +priceA;
};

export const updateOrderBookFromBufferLogger = ({
  list,
  event
}: {
  list: NormalizedDepth;
  event: Depth;
}) => {
  if (
    !(
      event.firstUpdateId <= list.lastUpdateId + 1 &&
      event.lastUpdateId >= list.lastUpdateId + 1
    )
  )
    console.log(
      `${event.firstUpdateId} <= ${list.lastUpdateId + 1}`,
      `${event.lastUpdateId} >= ${list.lastUpdateId + 1}`
    );
};

export const updateOrderBookFromSocketLogger = ({
  terminalType,
  list,
  depthSocketData,
  asks,
  bids
}: {
  terminalType: TerminalType;
  list: NormalizedDepth;
  depthSocketData: Depth;
  bids: NormalizedDepthList;
  asks: NormalizedDepthList;
}) => {
  const ask = Object.values(asks).sort(
    ([priceA], [priceB]) => +priceB - +priceA
  )[Object.values(asks).length - 1];
  const bid = Object.values(bids).sort(
    ([priceA], [priceB]) => +priceB - +priceA
  )[0];
  if (ask && bid && +ask[0] < +bid[0])
    console.log("Update: ask is less than bid", ask[0], bid[0]);

  if (
    terminalType === "spot" &&
    depthSocketData.firstUpdateId !== list.lastUpdateId + 1
  ) {
    console.log(
      `new event id failed`,
      depthSocketData.firstUpdateId,
      list.lastUpdateId
    );
    // return;
  }
  if (
    terminalType === "futures" &&
    depthSocketData.prevLastUpdateId &&
    depthSocketData.prevLastUpdateId !== list.lastUpdateId
  ) {
    console.log(
      `new event id failed`,
      depthSocketData.prevLastUpdateId,
      list.lastUpdateId
    );
    // return;
  }
};

export const getDividerParts = (
  divider: string = "0.00001"
): DividerPartsType => {
  const dottedDivider = divider.trim().split(".");
  const intLength = dottedDivider.length > 1 ? undefined : divider.length;
  const fracLength =
    dottedDivider.length > 1 ? dottedDivider[1].length : undefined;
  return { intLength, fracLength };
};

export const getNewPriceWithDivider = (
  price: string,
  { intLength, fracLength }: DividerPartsType,
  add?: boolean
): string => {
  const [int, frac] = price.split(".");
  if (fracLength) {
    const value = `${int}.${frac.slice(0, fracLength)}`;
    return add
      ? formatValue(+value, fracLength, undefined, {
          breakZero: true,
          up: +value !== 0
        })
      : value;
  }
  if (intLength) {
    const addValue = +Math.pow(10, intLength - 1);
    const value =
      int.slice(0, int.length - intLength + 1) + "0".repeat(intLength - 1);
    return add ? String(+value + addValue) : value;
  }
  return price;
};

export const collapseItems = (
  items: { [keys: string]: StringBidDepth },
  dividerParts: DividerPartsType,
  options?: { add?: boolean; enable?: boolean }
): { [keys: string]: StringBidDepth } => {
  if (!options?.enable) return items;
  const collapsedItems: { [keys: string]: StringBidDepth } = {};
  Object.values(items).forEach(([price, amount]) => {
    const newPrice = getNewPriceWithDivider(price, dividerParts, options?.add);
    if (collapsedItems[newPrice]) {
      collapsedItems[newPrice] = [
        newPrice,
        String(+collapsedItems[newPrice][1] + +amount)
      ];
    } else collapsedItems[newPrice] = [newPrice, amount];
  });
  return collapsedItems;
};

// export const useSymbolTick = () => {
//   const {
//     exchangeInfo,
//     symbol: { baseAsset, quoteAsset }
//   } = useContext(TerminalInfoContext);
//   if (!exchangeInfo) return;
//
//   const { filters } = safeGetElemFromArray(
//     exchangeInfo!.symbols,
//     symbol => symbol.symbol === getSymbol(baseAsset, quoteAsset)
//   );
//   const { tickSize } = getSymbolPriceFilter(filters);
//   return tickSize;
// };

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

export const countOrderBookFuturesSum = (
  items: StringBidDepth[],
  index: number,
  reverse?: boolean
): number => {
  const slicedItems = reverse ? items.slice(index) : items.slice(0, index + 1);
  return slicedItems.reduce((acc, [_, quantity]) => +acc + +quantity, 0);
};

export const getOrderBookLimitOrders = (
  // openOrders?: SpotOrder[] | FuturesOrder[],
  symbol: string,
  openOrders: any[],
  reverse?: boolean
): number[] => {
  return openOrders
    .filter(order => order.symbol === symbol)
    .filter(({ type }) => type.toUpperCase() === "LIMIT")
    .filter(
      ({ orderStatus }) =>
        orderStatus &&
        (orderStatus.toUpperCase() === "NEW" ||
          orderStatus.toUpperCase() === "PARTIALLYFILLED")
    )
    .filter(
      ({ side }) =>
        (reverse && side.toUpperCase() === "SELL") ||
        (!reverse && side.toUpperCase() === "BUY")
    )
    .map(({ price }) => +price);
};

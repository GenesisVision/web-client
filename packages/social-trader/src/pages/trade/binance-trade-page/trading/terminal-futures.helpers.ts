import {
  BinanceOrderSide,
  BinancePositionSide,
  BinanceWorkingType
} from "gv-api-web";
import { TFunction } from "i18next";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { AnyObjectType } from "utils/types";

import {
  FUTURES_ACCOUNT_EVENT,
  FuturesAccountUpdateEvent,
  FuturesMarginCallEvent,
  FuturesMarginCallEventPosition
} from "../services/futures/binance-futures.types";
import { terminalMoneyFormat } from "./components/terminal-money-format/terminal-money-format";
import { setUpperFirstLetter } from "./terminal.helpers";
import {
  FuturesOrder,
  FuturesOrderType,
  MergedTickerSymbolType,
  Position,
  PositionMini,
  SymbolState
} from "./terminal.types";

export const filterFuturesAccountUpdateStream = (
  $userStream: Observable<any>
): Observable<FuturesAccountUpdateEvent> =>
  $userStream.pipe(
    filter(info => info.eventType === FUTURES_ACCOUNT_EVENT.accountUpdate)
  );

export const filterMarginCallStream = (
  $userStream: Observable<any>
): Observable<FuturesMarginCallEvent> =>
  $userStream.pipe(
    filter(info => info.eventType === FUTURES_ACCOUNT_EVENT.marginCall)
  );

export const generateMarginCallMessage = (
  position: FuturesMarginCallEventPosition,
  crossWalletBalance?: string
): string => {
  return "";
};

export const generateFuturesOrderMessage = (
  order: FuturesOrder,
  symbol: MergedTickerSymbolType,
  t: TFunction
): string => {
  const { stepSize } = symbol.lotSizeFilter;
  const positionReduce =
    order.positionSide === "Both" && order.reduceOnly ? "Reduce " : "";
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
  return `${positionReduce}${orderType} ${orderSide} order ${executionTypeTitle?.toLowerCase()}\n\n${setUpperFirstLetter(
    executionTypeDescription
  )} exchange ${positionReduce.toLowerCase()}${orderType.toLowerCase()} ${orderSide.toLowerCase()} order for ${terminalMoneyFormat(
    {
      amount: order.quantity,
      tickSize: String(stepSize)
    }
  )} ${symbol.baseAsset} by using ${symbol.quoteAsset}`;
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
      return type;
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

const getFuturesTriggerSign = (
  // TODO TrailingStopMarket
  type: Exclude<
    FuturesOrderType,
    "Market" | "Limit" | "TrailingStopMarket" | "Liquidation"
  >,
  side: BinanceOrderSide
): ">=" | "<=" => {
  if (side === "Buy") {
    switch (type) {
      case "Stop":
        return ">=";
      case "StopMarket":
        return ">=";
      case "TakeProfit":
        return "<=";
      case "TakeProfitMarket":
        return "<=";
    }
  } else {
    switch (type) {
      case "Stop":
        return "<=";
      case "StopMarket":
        return "<=";
      case "TakeProfit":
        return ">=";
      case "TakeProfitMarket":
        return ">=";
    }
  }
};

export const getFuturesTriggerConditionsLabel = ({
  t,
  workingType,
  stopPrice,
  tickSize,
  type,
  side
}: {
  t: TFunction;
  workingType: BinanceWorkingType;
  stopPrice: number;
  tickSize: number | string;
  type: FuturesOrderType;
  side: BinanceOrderSide;
}): string => {
  if (!+stopPrice) {
    return "–";
  }
  const name = workingType === "Contract" ? t("Last Price") : t("Mark Price");
  const sign = getFuturesTriggerSign(type as any, side);
  return `${name} ${sign} ${terminalMoneyFormat({
    amount: stopPrice,
    tickSize: String(tickSize)
  })}`;
};

// one-way :

// stop buy >=
// stop sell <=
// stopmarket buy >=
// stopmarket sell <=
// takeprofit buy <=
// takeprofit sell >=
// takeprofitmarket buy <=
// takeprofitmarket sell >=

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

export const normalizePositionsList = (
  list: Position[] | PositionMini[]
): { [keys: string]: Position } => {
  const initObject: AnyObjectType = {};
  list.forEach(item => {
    if (!initObject[item.symbol]) initObject[item.symbol] = {};
    initObject[item.symbol][item.positionSide] = item;
  });
  return initObject;
};

export const updatePositionsList = (
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

export const flatNormalizedPositions = (positions: {
  [keys: string]: Position;
}): Position[] => {
  return Object.values(positions)
    .map(item => Object.values(item))
    .flat();
};

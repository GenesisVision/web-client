import { SortingColumn } from "components/table/components/filtering/filter.type";
import { BinanceOrderSide, BinanceWorkingType } from "gv-api-web";
import { TFunction } from "i18next";
import { terminalMoneyFormat } from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import {
  FuturesOrder,
  FuturesOrderType,
  UnitedOrder
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { AnyObjectType } from "utils/types";

export const normalizeOpenOrdersList = (
  list: UnitedOrder[] | FuturesOrder[]
) => {
  const initObject: AnyObjectType = {};
  list.forEach(item => (initObject[item.id] = item));
  return initObject;
};

export const OPEN_ORDERS_TABLE_COLUMNS: SortingColumn[] = [
  {
    name: "date"
  },
  {
    name: "pair"
  },
  {
    name: "type"
  },
  {
    name: "side"
  },
  {
    name: "price"
  },
  {
    name: "amount"
  },
  {
    name: "filled"
  },
  {
    name: "total"
  },
  {
    name: "trigger conditions"
  },
  {
    name: "cancel-all"
  }
];

export const OPEN_ORDERS_FUTURES_TABLE_COLUMNS: SortingColumn[] = [
  {
    name: "time"
  },
  {
    name: "symbol"
  },
  {
    name: "type"
  },
  {
    name: "side"
  },
  {
    name: "price"
  },
  {
    name: "amount"
  },
  {
    name: "filled"
  },
  {
    name: "reduce-only"
  },
  {
    name: "trigger-conditions"
  },
  {
    name: "cancel-all"
  }
];

const getFuturesTriggerSign = (
  // TODO TrailingStopMarket
  type: Exclude<FuturesOrderType, "Market" | "Limit" | "TrailingStopMarket">,
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
  tickSize: number;
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

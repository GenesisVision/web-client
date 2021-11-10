import {
  FuturesPlaceOrderMode,
  PriceType
} from "pages/trade/binance-trade-page/trading/place-order/place-order.types";
import {
  formatValueWithTick,
  getSymbolFilters
} from "pages/trade/binance-trade-page/trading/terminal.helpers";
import {
  AssetBalance,
  ExchangeInfo,
  OrderSide,
  OrderType,
  PositionModeType,
  PositionSideType,
  TerminalCurrency,
  TerminalType
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { safeGetElemFromArray, tableLoaderCreator } from "utils/helpers";

import { FuturesPositionInformation } from "./../terminal.types";

export const mapPlaceOrderErrors = (error: string) => {
  switch (error) {
    case "Failed (-2015 Invalid API-key, IP, or permissions for action.)":
      return "Trading is currently unavailable";
    case "Failed (-2010 Account has insufficient balance for requested action.)":
      return "Order failed: insufficient balance";
    case "Failed (-2019 Margin is insufficient.)":
      return "Order failed: margin is insufficient";
    case "Failed (-2021 Order would immediately trigger.)":
      return "Order would immediately trigger.";
    case "Failed (-2022 ReduceOnly Order is rejected.)":
      return "ReduceOnly Order is rejected.";
    default:
      return error;
  }
};

export const getSpotTradeType = ({
  stopPrice,
  type,
  side,
  currentPrice,
  price
}: {
  stopPrice?: PriceType;
  type: OrderType;
  side: OrderSide;
  currentPrice: number | string;
  price: number | string;
}): OrderType => {
  switch (type) {
    case "TakeProfitLimit":
      switch (side) {
        case "Buy":
          if (+price < +currentPrice) {
            if (stopPrice && +stopPrice < +currentPrice)
              return "TakeProfitLimit";
            else return "StopLossLimit";
          } else {
            if (stopPrice && +stopPrice < +currentPrice)
              return "TakeProfitLimit";
            else return "StopLossLimit";
          }
        case "Sell":
          if (+price > +currentPrice) {
            if (stopPrice && +stopPrice > +currentPrice)
              return "TakeProfitLimit";
            else return "StopLossLimit";
          } else {
            if (stopPrice && +stopPrice < +currentPrice) return "StopLossLimit";
            else return "TakeProfitLimit";
          }
      }
      break;
    default:
      return type;
  }
};

export const getFuturesTradeType = ({
  stopPrice,
  type,
  side,
  currentPrice
}: {
  stopPrice?: PriceType;
  type: OrderType;
  side: OrderSide;
  currentPrice: number | string;
}): OrderType => {
  // BUT SELL If stopPrice === currentPrice or currentMarkPrice (binance sends Stop in both cases) ===> display error
  // BUY CONTRACT if stop price less than currentPrice or MarkPrice ===> TakeProfit
  // BUY CONTRACT if stop price larger than currentPrice or MarkPrice ===> Stop
  // SELL CONTRACT if stop price less than currentPrice or MarkPrice ===> Stop
  // SELL CONTRACT if stop price larger than currentPrice or MarkPrice ===> TakeProfit
  // BUY MARK if stop price less than currentMarkPrice ===> TakeProfit
  // BUY MARK if stop price larger than currentMarkPrice ===> Stop
  // SELL MARK if stop price less than currentMarkPrice ===> Stop
  // SELL MARK if stop price larger than currentMarkPrice ===> TakeProfit
  switch (type) {
    case "TakeProfit":
      switch (side) {
        case "Buy":
          if (+stopPrice! < +currentPrice) {
            return "TakeProfit";
          } else {
            return "Stop";
          }
        case "Sell":
          if (+stopPrice! > +currentPrice) {
            return "TakeProfit";
          } else {
            return "Stop";
          }
      }
      break;
    default:
      return type;
  }
};

export const RANGE_MARKS = {
  0: "0%",
  25: "25%",
  50: "50%",
  75: "75%",
  100: "100%"
};

export const getBalanceLoaderData = (
  asset: string = "BTC"
) => (): AssetBalance => ({
  asset,
  amountInCurrency: 0,
  total: 0,
  free: 0,
  locked: 0
});

export const getBalancesLoaderData = (asset: string) =>
  tableLoaderCreator(getBalanceLoaderData(asset), 1);

export const getBalance = (
  balances: AssetBalance[],
  currency: TerminalCurrency
) => {
  const wallet = balances?.find(({ asset }) => asset === currency);
  return wallet ? wallet.free : 0;
};

export const getFilterValues = (exchangeInfo: ExchangeInfo, symbol: string) => {
  const {
    priceFilter,
    lotSizeFilter,
    minNotionalFilter,
    marketLotSizeFilter
  } = getSymbolFilters(exchangeInfo, symbol);
  return {
    minPrice: priceFilter ? priceFilter.minPrice : 0,
    maxPrice: priceFilter ? priceFilter.maxPrice : 0,
    tickSize: priceFilter ? String(priceFilter.tickSize) : "0",
    minQuantity: lotSizeFilter ? lotSizeFilter.minQuantity : 0,
    maxQuantity: lotSizeFilter ? lotSizeFilter.maxQuantity : 0,
    stepSize: lotSizeFilter ? String(lotSizeFilter.stepSize) : "0",
    minNotional: minNotionalFilter ? minNotionalFilter.minNotional : 0,
    marketMinQuantity: marketLotSizeFilter
      ? marketLotSizeFilter.minQuantity
      : 0,
    marketMaxQuantity: marketLotSizeFilter
      ? marketLotSizeFilter.maxQuantity
      : 0,
    marketStepSize: marketLotSizeFilter
      ? String(marketLotSizeFilter.stepSize)
      : "0"
  };
};

export const getPositionSide = ({
  placeOrderMode,
  side
}: {
  side: OrderSide;
  placeOrderMode: FuturesPlaceOrderMode;
}) => {
  if (placeOrderMode === "OneWay") {
    return "Both";
  }
  if (side === "Buy") {
    if (placeOrderMode === "HedgeClose") {
      return "Short";
    } else {
      return "Long";
    }
  } else {
    if (placeOrderMode === "HedgeClose") {
      return "Long";
    } else {
      return "Short";
    }
  }
};

export const getPositionInfo = (
  data: FuturesPositionInformation[],
  positionSide?: PositionSideType
): FuturesPositionInformation => {
  return safeGetElemFromArray(
    data,
    item => item.positionSide.toUpperCase() === positionSide
  );
};

export const getFuturesQuantityValue = ({
  sliderBuy,
  sliderSell,
  percentMode,
  quantity,
  side,
  stepSize
}: {
  sliderBuy: number;
  sliderSell: number;
  quantity: string;
  percentMode: boolean;
  side: OrderSide;
  stepSize: string;
}) => {
  if (!percentMode) {
    return quantity;
  }

  if (side === "Buy") {
    return formatValueWithTick(sliderBuy, stepSize);
  }

  return formatValueWithTick(sliderSell, stepSize);
};

export const getPlaceOrderButtonLabel = ({
  asset,
  side,
  terminalType,
  placeOrderMode
}: {
  side: OrderSide;
  terminalType: TerminalType;
  asset?: string;
  placeOrderMode?: FuturesPlaceOrderMode;
}): string => {
  if (terminalType === "spot") {
    return `${side} ${asset}`;
  }

  switch (placeOrderMode) {
    case "OneWay":
      if (side === "Buy") {
        return "Buy/Long";
      }
      return "Sell/Short";
    case "HedgeOpen":
      if (side === "Buy") {
        return "Open long";
      }
      return "Open short";
    case "HedgeClose":
      if (side === "Buy") {
        return "Close short";
      }
      return "Close long";
    default:
      return "";
  }
};

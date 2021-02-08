import {
  AssetBalance,
  ExchangeInfo,
  OrderSide,
  OrderType,
  PositionModeType,
  TerminalCurrency,
  TerminalType
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { tableLoaderCreator } from "utils/helpers";
import { getSymbolFilters } from "pages/trade/binance-trade-page/trading/terminal.helpers";

export const mapPlaceOrderErrors = (error: string) => {
  switch (error) {
    case "Failed (-2015 Invalid API-key, IP, or permissions for action.)":
      return "Trading is currently unavailable";
    case "Failed (-2010 Account has insufficient balance for requested action.)":
      return "Order failed: insufficient balance";
    default:
      return error;
  }
};

export const getTradeType = ({
  type,
  side,
  currentPrice,
  price
}: {
  type: OrderType;
  side: OrderSide;
  currentPrice: number | string;
  price: number | string;
}): OrderType => {
  switch (type) {
    case "TakeProfitLimit":
      switch (side) {
        case "Buy":
          return +price < +currentPrice ? "TakeProfitLimit" : "StopLossLimit";
        case "Sell":
          return +price > +currentPrice ? "TakeProfitLimit" : "StopLossLimit";
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
  const { priceFilter, lotSizeFilter, minNotionalFilter } = getSymbolFilters(
    exchangeInfo,
    symbol
  );
  return {
    minPrice: priceFilter ? priceFilter.minPrice : 0,
    maxPrice: priceFilter ? priceFilter.maxPrice : 0,
    minQuantity: lotSizeFilter ? lotSizeFilter.minQuantity : 0,
    maxQuantity: lotSizeFilter ? lotSizeFilter.maxQuantity : 0,
    minNotional: minNotionalFilter ? minNotionalFilter.minNotional : 0
  };
};

export const getPositionSide = ({
  positionMode,
  side,
  terminalType
}: {
  side: OrderSide;
  terminalType: TerminalType;
  positionMode: PositionModeType | undefined;
}) => {
  if (terminalType === "futures") return undefined;
  if (positionMode === "OneWay") return "Both";
  if (side === "Buy") return "Long";
  else return "Short";
};

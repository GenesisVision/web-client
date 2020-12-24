import { DEFAULT_DECIMAL_SCALE } from "constants/constants";
import dayjs from "dayjs";
import {
  BinanceRawKline,
  BinanceRawOrder,
  BinanceRawOrderBookEntry,
  BrokerTradeServerType
} from "gv-api-web";
import { getBinanceTerminalApiMethods } from "pages/trade/binance-trade-page/binance-trade.helpers";
import { Bar } from "pages/trade/binance-trade-page/trading/chart/charting_library/datafeed-api";
import { DividerPartsType } from "pages/trade/binance-trade-page/trading/order-book/order-book.helpers";
import {
  StringBidDepth,
  TerminalType,
  UnitedOrder
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { formatValue } from "utils/formatter";

export const getTerminalApiMethods = (
  brokerType?: BrokerTradeServerType,
  type?: TerminalType
) => {
  switch (brokerType) {
    case "Binance":
    default:
      return getBinanceTerminalApiMethods(type);
  }
};

export const transformKlineBar = ({
  close,
  high,
  low,
  open,
  openTime,
  baseVolume
}: BinanceRawKline): Bar => ({
  close,
  high,
  low,
  open,
  time: dayjs(openTime).unix() * 1000,
  volume: baseVolume
});

export const transformToUnitedOrder = ({
  commissionAsset,
  status,
  commission,
  quoteQuantityFilled,
  orderId,
  createTime,
  symbol,
  type,
  side,
  stopPrice,
  price,
  quantity,
  quoteQuantity,
  quantityFilled
}: BinanceRawOrder): UnitedOrder => ({
  commissionAsset,
  orderStatus: status,
  commission,
  quoteQuantityFilled,
  executedQuantity: quoteQuantity,
  id: orderId,
  time: createTime,
  symbol,
  type,
  side,
  stopPrice,
  price,
  quantityFilled,
  quantity
});

export const getPriceWithCorrectFrac = (
  price: string,
  correctFracLength: number = 8
) => {
  const [int, frac = ""] = price.split(".");
  const correctFrac = frac + "0".repeat(correctFracLength - frac.length);
  return [int, correctFrac].join(".");
};

export const transformDepthToString = (dividerParts: DividerPartsType) => ({
  price,
  quantity
}: BinanceRawOrderBookEntry): StringBidDepth => {
  const newPrice = getPriceWithCorrectFrac(
    formatValue(price, DEFAULT_DECIMAL_SCALE),
    dividerParts.fracLength
  );
  return [newPrice, String(quantity)];
};

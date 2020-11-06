import { BinanceRawSymbol } from "gv-api-web";

export interface ChartSymbol {}

export const transformSymbols = ({
  name,
  baseAsset,
  baseAssetPrecision,
  baseCommissionPrecision,
  isMarginTradingAllowed,
  isSpotTradingAllowed,
  ocoAllowed,
  orderTypes,
  quoteAsset,
  quoteCommissionPrecision,
  status,
  iceBergAllowed,
  quoteAssetPrecision,
  quoteOrderQuantityMarketAllowed
}: BinanceRawSymbol) => ({
  symbol: name,
  baseAsset,
  baseAssetPrecision,
  baseCommissionPrecision,
  icebergAllowed: iceBergAllowed,
  isMarginTradingAllowed,
  isSpotTradingAllowed,
  ocoAllowed,
  orderTypes,
  quoteAsset,
  quoteCommissionPrecision,
  quoteOrderQtyMarketAllowed: quoteOrderQuantityMarketAllowed,
  quotePrecision: quoteAssetPrecision,
  status
});

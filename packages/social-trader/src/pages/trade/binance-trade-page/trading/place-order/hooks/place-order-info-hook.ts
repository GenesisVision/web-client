import { BinanceOrderType } from "gv-api-web";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { FilterValues } from "pages/trade/binance-trade-page/trading/place-order/place-order.types";
import { OrderSide } from "pages/trade/binance-trade-page/trading/terminal.types";
import { useContext, useMemo } from "react";

interface UsePlaceOrderInfoSpotReturn {
  minPrice: number;
  maxPrice: number;
  minQuantity: number;
  minNotional: number;
  maxQuantityWithWallet: number;
  maxTotalWithWallet: number;
}

export const useSpotPlaceOrderInfo = ({
  filterValues,
  balanceBase,
  balanceQuote,
  side
}: {
  filterValues: FilterValues;
  side: OrderSide;
  balanceBase: number;
  balanceQuote: number;
}): UsePlaceOrderInfoSpotReturn => {
  const {
    symbol: { baseAsset, quoteAsset }
  } = useContext(TerminalInfoContext);

  const {
    minPrice,
    maxPrice,
    minQuantity,
    maxQuantity,
    minNotional
  } = filterValues;

  const maxQuantityWithWallet = useMemo(() => {
    return side === "Buy" ? +maxQuantity : Math.min(+maxQuantity, balanceBase);
  }, [side, maxQuantity, balanceQuote, balanceBase, baseAsset]);

  const maxTotalWithWallet = useMemo(() => {
    return side === "Buy" ? balanceQuote : Number.MAX_SAFE_INTEGER;
  }, [side, balanceQuote, quoteAsset]);

  return useMemo(
    () => ({
      minPrice,
      maxPrice,
      minQuantity,
      minNotional,
      maxQuantityWithWallet,
      maxTotalWithWallet
    }),
    [
      minPrice,
      maxPrice,
      minQuantity,
      minNotional,
      maxQuantityWithWallet,
      maxTotalWithWallet
    ]
  );
};

interface UsePlaceOrderInfoFuturesReturn {
  minPrice: number;
  maxPrice: number;
  minQuantity: number;
  maxQuantity: number;
}

export const useFuturesPlaceOrderInfo = ({
  filterValues,
  type
}: {
  filterValues: FilterValues;
  type?: BinanceOrderType;
}): UsePlaceOrderInfoFuturesReturn => {
  const {
    minPrice,
    maxPrice,
    minQuantity,
    maxQuantity,
    marketMaxQuantity,
    marketMinQuantity
  } = filterValues;

  return useMemo(
    () => ({
      minPrice,
      maxPrice,
      minQuantity: type === "Market" ? marketMinQuantity : minQuantity,
      maxQuantity: type === "Market" ? marketMaxQuantity : maxQuantity
    }),
    [minPrice, maxPrice, minQuantity, maxQuantity, type]
  );
};

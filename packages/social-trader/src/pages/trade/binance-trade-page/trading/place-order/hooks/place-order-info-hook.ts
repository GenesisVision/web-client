import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { OrderSide } from "pages/trade/binance-trade-page/trading/terminal.types";
import { useContext, useMemo } from "react";
import { TerminalPlaceOrderContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-place-order.context";
import { FilterValues } from "pages/trade/binance-trade-page/trading/place-order/place-order.types";

export interface UsePlaceOrderInfoReturn {
  minPrice: number;
  maxPrice: number;
  minQuantity: number;
  minNotional: number;
  maxQuantityWithWallet: number;
  maxTotalWithWallet: number;
}

export const usePlaceOrderInfo = ({
  filterValues,
  balanceBase,
  balanceQuote,
  side
}: {
  filterValues: FilterValues;
  side: OrderSide;
  balanceBase: number;
  balanceQuote: number;
}): UsePlaceOrderInfoReturn => {
  const { leverage } = useContext(TerminalPlaceOrderContext);
  const {
    terminalType,
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
    return side === "Buy"
      ? +maxQuantity
      : Math.min(
          +maxQuantity,
          terminalType === "futures" ? balanceQuote : balanceBase
        );
  }, [side, maxQuantity, terminalType, balanceQuote, balanceBase, baseAsset]);

  const maxTotalWithWallet = useMemo(() => {
    return side === "Buy" ? balanceQuote * leverage : Number.MAX_SAFE_INTEGER;
  }, [side, balanceQuote, quoteAsset, leverage]);

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

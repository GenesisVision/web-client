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
  balance,
  side
}: {
  filterValues: FilterValues;
  side: OrderSide;
  balance: number;
}): UsePlaceOrderInfoReturn => {
  const { leverage } = useContext(TerminalPlaceOrderContext);
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
    return side === "Buy" ? +maxQuantity : Math.min(+maxQuantity, balance);
  }, [side, maxQuantity, balance, baseAsset]);

  const maxTotalWithWallet = useMemo(() => {
    return side === "Buy" ? balance * leverage : Number.MAX_SAFE_INTEGER;
  }, [side, balance, quoteAsset, leverage]);

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

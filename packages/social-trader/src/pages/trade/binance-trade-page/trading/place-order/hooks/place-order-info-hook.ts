import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { getSymbol } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { AssetBalance, ExchangeInfo, OrderSide } from "pages/trade/binance-trade-page/trading/terminal.types";
import { useContext, useMemo } from "react";

import { getBalance, getFilterValues } from "../place-order.helpers";

export const usePlaceOrderInfo = ({
  exchangeInfo,
  balances,
  side
}: {
  exchangeInfo: ExchangeInfo;
  side: OrderSide;
  balances: AssetBalance[];
}) => {
  const {
    symbol: { baseAsset, quoteAsset },
    terminalType
  } = useContext(TerminalInfoContext);

  const {
    minPrice,
    maxPrice,
    minQuantity,
    maxQuantity,
    minNotional
  } = getFilterValues(exchangeInfo, getSymbol(baseAsset, quoteAsset));

  const maxQuantityWithWallet = useMemo(() => {
    return side === "Buy"
      ? +maxQuantity
      : Math.min(
          +maxQuantity,
          +getBalance(
            balances,
            terminalType === "futures" ? quoteAsset : baseAsset
          )
        );
  }, [side, maxQuantity, balances, baseAsset]);

  const maxTotalWithWallet = useMemo(() => {
    return side === "Buy"
      ? +getBalance(balances, quoteAsset)
      : Number.MAX_SAFE_INTEGER;
  }, [side, balances, quoteAsset]);
  return {
    minPrice,
    maxPrice,
    minQuantity,
    minNotional,
    maxQuantityWithWallet,
    maxTotalWithWallet
  };
};

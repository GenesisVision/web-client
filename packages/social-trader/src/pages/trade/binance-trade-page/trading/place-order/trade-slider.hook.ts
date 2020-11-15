import {
  terminalMoneyFormat,
  truncated
} from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import { getDecimalScale } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import {
  AssetBalance,
  OrderSide
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { useContext, useEffect, useState } from "react";
import { calculatePercentage } from "utils/currency-converter";
import { formatValue } from "utils/formatter";
import { AnyObjectType } from "utils/types";

import { getBalance } from "./place-order.helpers";

export const useTradeSlider = ({
  watch,
  setValue,
  side,
  balances,
  quantityName
}: {
  watch: () => AnyObjectType;
  setValue: (name: string, value?: number, shouldValidate?: boolean) => void;
  side: OrderSide;
  balances: AssetBalance[];
  quantityName: string;
}) => {
  const {
    symbol: { quoteAsset, baseAsset },
    stepSize,
    terminalType
  } = useContext(TerminalInfoContext);
  const [sliderValue, setSliderValue] = useState<number | undefined>();
  useEffect(() => {
    if (sliderValue === undefined) return;
    if (side === "Buy") {
      const { price } = watch();
      const walletAvailable = +getBalance(balances, quoteAsset);
      const fullTotal = calculatePercentage(walletAvailable, sliderValue);
      const newAmount = truncated(
        fullTotal / price,
        getDecimalScale(formatValue(stepSize))
      );
      setValue(quantityName, newAmount, true);
    }
    if (side === "Sell") {
      const walletAvailable = +getBalance(
        balances,
        terminalType === "futures" ? quoteAsset : baseAsset
      );
      const percentAmount = calculatePercentage(walletAvailable, sliderValue);
      if (
        truncated(percentAmount, getDecimalScale(formatValue(stepSize))) === 0
      )
        return;
      const newQuantity = +terminalMoneyFormat({
        amount: percentAmount,
        tickSize: stepSize
      });
      setValue(quantityName, newQuantity, true);
    }
  }, [sliderValue]);
  return { sliderValue, setSliderValue };
};

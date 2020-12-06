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
import { useContext, useState } from "react";
import { calculatePercentage } from "utils/currency-converter";
import { formatValue } from "utils/formatter";
import { AnyObjectType } from "utils/types";

import { getBalance } from "../place-order.helpers";

export type SetSliderValueFunc = (
  sliderValue?: number,
  shouldUpdate?: boolean
) => void;

export const MAX_TRADE_SLIDER_VALUE = 100;

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
  const { price } = watch();
  const [sliderValue, setSliderValue] = useState<number | undefined>();

  const handleSetSlider: SetSliderValueFunc = (
    sliderValue,
    shouldUpdate = true
  ) => {
    const newValue = !!sliderValue
      ? Math.min(sliderValue, MAX_TRADE_SLIDER_VALUE)
      : sliderValue;
    setSliderValue(newValue);
    if (newValue === undefined || !shouldUpdate) return;
    if (side === "Buy") {
      const walletAvailable = +getBalance(balances, quoteAsset);
      const fullTotal = calculatePercentage(walletAvailable, newValue);
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
      const percentAmount = calculatePercentage(walletAvailable, newValue);
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
  };
  return { sliderValue, setSliderValue: handleSetSlider };
};

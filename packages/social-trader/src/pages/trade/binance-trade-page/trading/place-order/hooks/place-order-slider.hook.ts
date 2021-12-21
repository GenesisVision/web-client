import {
  terminalMoneyFormat,
  truncated
} from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { getDecimalScale } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { OrderSide } from "pages/trade/binance-trade-page/trading/terminal.types";
import { useContext, useState } from "react";
import { calculatePercentage } from "utils/currency-converter";
import { formatValue } from "utils/formatter";
import { AnyObjectType } from "utils/types";

export type SetSliderValueFunc = (
  sliderValue?: number,
  shouldUpdate?: boolean
) => void;

export const MAX_TRADE_SLIDER_VALUE = 100;

export const useTradeSlider = ({
  watch,
  setValue,
  side,
  balanceBase,
  balanceQuote,
  quantityName
}: {
  watch: () => AnyObjectType;
  setValue: (name: string, value?: number, shouldValidate?: boolean) => void;
  side: OrderSide;
  balanceBase: number;
  balanceQuote: number;
  quantityName: string;
}) => {
  const { stepSize } = useContext(TerminalInfoContext);
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
      const fullTotal = calculatePercentage(balanceQuote, newValue);
      const newAmount = truncated(
        fullTotal / price,
        getDecimalScale(formatValue(stepSize))
      );
      setValue(quantityName, newAmount, true);
    }
    if (side === "Sell") {
      const percentAmount = calculatePercentage(balanceBase, newValue);
      if (
        truncated(percentAmount, getDecimalScale(formatValue(stepSize))) === 0
      )
        return;
      const newQuantity =
        newValue === MAX_TRADE_SLIDER_VALUE
          ? balanceBase
          : +terminalMoneyFormat({
              amount: percentAmount,
              tickSize: stepSize
            });
      setValue(quantityName, newQuantity, true);
    }
  };
  return { sliderValue, setSliderValue: handleSetSlider };
};

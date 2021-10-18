import { Slider } from "components/range/range";
import {
  MAX_TRADE_SLIDER_VALUE,
  SetSliderValueFunc
} from "pages/trade/binance-trade-page/trading/place-order/hooks/place-order-slider.hook";
import React, { useCallback } from "react";

import { RANGE_MARKS } from "./place-order.helpers";

export interface IPlaceOrderSliderProps {
  setValue: SetSliderValueFunc | ((value: number) => void);
  value?: number;
  setPercentMode?: (flag: boolean) => void;
}

const _PlaceOrderSlider: React.FC<IPlaceOrderSliderProps> = ({
  setPercentMode,
  value,
  setValue
}) => {
  const handleChange = useCallback(
    (value: number) => {
      setPercentMode && setPercentMode(true);
      setValue(value);
    },
    [setValue]
  );

  return (
    <Slider
      min={0}
      max={MAX_TRADE_SLIDER_VALUE}
      marks={RANGE_MARKS}
      value={value}
      onChange={handleChange}
    />
  );
};

export const PlaceOrderSlider = React.memo(_PlaceOrderSlider);

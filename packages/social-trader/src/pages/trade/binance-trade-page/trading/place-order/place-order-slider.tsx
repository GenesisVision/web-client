import { Slider } from "components/range/range";
import { RANGE_MARKS } from "pages/trade/binance-trade-page/trading/place-order/place-order.helpers";
import React, { useCallback } from "react";

import {
  MAX_TRADE_SLIDER_VALUE,
  SetSliderValueFunc
} from "./hooks/trade-slider.hook";

export interface IPlaceOrderSliderProps {
  value?: number;
  setValue: SetSliderValueFunc;
}

const _PlaceOrderSlider: React.FC<IPlaceOrderSliderProps> = ({
  value,
  setValue
}) => {
  return (
    <Slider
      min={0}
      max={MAX_TRADE_SLIDER_VALUE}
      marks={RANGE_MARKS}
      value={value}
      onChange={useCallback((value: number) => setValue(value), [setValue])}
    />
  );
};

export const PlaceOrderSlider = React.memo(_PlaceOrderSlider);

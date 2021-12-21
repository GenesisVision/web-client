import { useEffect, useState } from "react";

import { PlaceOrderFormSetValueType } from "../place-order.types";

export const useFuturesPlaceOrderSlider = ({
  setValue,
  quantityName
}: {
  setValue: PlaceOrderFormSetValueType;
  quantityName: string;
}) => {
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [percentMode, setPercentMode] = useState<boolean>(false);

  useEffect(() => {
    setValue(quantityName, String(sliderValue), true);
  }, [sliderValue]);

  return {
    sliderValue,
    setSliderValue,
    percentMode,
    setPercentMode
  };
};

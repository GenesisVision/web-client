import { API_REQUEST_STATUS } from "hooks/api-request.hook";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { PriceType } from "pages/trade/binance-trade-page/trading/place-order/place-order.types";
import {
  AssetBalance,
  OrderSide
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { useContext, useEffect, useState } from "react";
import { postponeFunc } from "utils/hook-form.helpers";
import { AnyObjectType } from "utils/types";

import { useTradeSlider } from "./trade-slider.hook";

export const usePlaceOrderFormReset = ({
  status,
  triggerValidation,
  outerPrice,
  reset,
  watch,
  setValue,
  side,
  balances,
  quantityName
}: {
  status: API_REQUEST_STATUS;
  triggerValidation: VoidFunction;
  watch: () => AnyObjectType;
  reset: (values: any) => void;
  outerPrice: PriceType;
  setValue: (name: string, value?: number, shouldValidate?: boolean) => void;
  side: OrderSide;
  balances: AssetBalance[];
  quantityName: string;
}) => {
  const { terminalType, symbol } = useContext(TerminalInfoContext);
  const { quantity, total, price } = watch();
  const { sliderValue, setSliderValue } = useTradeSlider({
    watch,
    side,
    setValue,
    balances,
    quantityName
  });
  const [isReset, setReset] = useState<boolean | undefined>();
  const [prevFormState, setPrevFormState] = useState<
    (AnyObjectType & { sliderValue?: number }) | undefined
  >();

  useEffect(() => {
    if (status === "SUCCESS") postponeFunc(() => setReset(true));
  }, [status]);

  useEffect(() => {
    if (isReset) {
      reset(watch());
      setReset(false);
    }
    if (isReset === false) triggerValidation();
  }, [isReset]);

  useEffect(() => {
    reset({
      timeInForce: watch().timeInForce,
      stopPrice: outerPrice,
      price: outerPrice,
      quantity,
      total
    });
  }, [outerPrice]);

  useEffect(() => {
    setSliderValue(0);
    reset({
      timeInForce: watch().timeInForce,
      stopPrice: outerPrice,
      price: outerPrice
    });
  }, [symbol, terminalType]);

  useEffect(() => {
    setPrevFormState({ ...watch(), sliderValue });
    if (prevFormState) {
      setSliderValue(prevFormState.sliderValue);
      reset({ ...prevFormState, price });
    }
  }, [side]);
  return { sliderValue, setSliderValue };
};

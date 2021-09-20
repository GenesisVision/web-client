import { DEFAULT_DECIMAL_SCALE } from "constants/constants";
import { terminalMoneyFormat } from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalPlaceOrderContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-place-order.context";
import { OrderSide } from "pages/trade/binance-trade-page/trading/terminal.types";
import { useContext, useEffect, useState } from "react";
import { formatValue } from "utils/formatter";

import {
  PlaceOrderFormSetValueType,
  PriceType,
  QuantityType,
  TotalType
} from "../place-order.types";
import { SetSliderValueFunc } from "./place-order-slider.hook";

export const usePlaceOrderAutoFill = ({
  buyWalletAvailable,
  sellWalletAvailable,
  setSliderValue,
  side,
  setValue,
  total,
  price,
  quantity,
  totalName,
  quantityName
}: {
  buyWalletAvailable: number;
  sellWalletAvailable: number;
  setSliderValue: SetSliderValueFunc;
  side: OrderSide;
  total: TotalType;
  price: PriceType;
  quantity: QuantityType;
  setValue: PlaceOrderFormSetValueType;
  totalName: string;
  quantityName: string;
}) => {
  const { stepSize, tickSize } = useContext(TerminalInfoContext);
  const { leverage } = useContext(TerminalPlaceOrderContext);
  const [autoFill, setAutoFill] = useState<boolean>(false);
  useEffect(() => {
    if (!autoFill) {
      const value = +terminalMoneyFormat({
        amount: +total / +price,
        tickSize: stepSize
      });
      if (isNaN(value)) return;
      if (value === +quantity) return;
      if (value > 0 || String(total) === "0") {
        setValue(quantityName, formatValue(value, DEFAULT_DECIMAL_SCALE), true);
        setAutoFill(true);

        if (side === "Sell" && sellWalletAvailable) {
          const newSliderValue = (value / sellWalletAvailable) * 100;
          setSliderValue(newSliderValue, false);
        }
        if (side === "Buy" && buyWalletAvailable) {
          const newSliderValue = (+total / buyWalletAvailable) * 100;
          setSliderValue(newSliderValue, false);
        }
      }
    } else setAutoFill(false);
  }, [total]);

  useEffect(() => {
    if (!autoFill) {
      const value = +terminalMoneyFormat({
        amount: (+quantity * +price) / leverage,
        tickSize: "0.00000001"
      });
      if (isNaN(value)) return;
      if (value === +total) return;
      if (value > 0 || String(quantity) === "0") {
        setValue(totalName, formatValue(value, DEFAULT_DECIMAL_SCALE), true);
        setAutoFill(true);

        if (side === "Sell" && sellWalletAvailable) {
          const newSliderValue = (+quantity / sellWalletAvailable) * 100;
          setSliderValue(newSliderValue, false);
        }
        if (side === "Buy" && buyWalletAvailable) {
          const newSliderValue = (value / buyWalletAvailable) * 100;
          setSliderValue(newSliderValue, false);
        }
      }
    } else setAutoFill(false);
  }, [quantity]);

  useEffect(() => {
    if (!autoFill) {
      if (quantity && price) {
        const value = +terminalMoneyFormat({
          amount: leverage * +quantity * +price,
          tickSize: "0.00000001"
        });
        if (isNaN(value)) return;
        if (value === +total) return;
        setValue(totalName, formatValue(value, DEFAULT_DECIMAL_SCALE), true);
        setAutoFill(true);
      }
    } else setAutoFill(false);
  }, [price]);
};

import { terminalMoneyFormat } from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import { TerminalPlaceOrderContext } from "pages/trade/binance-trade-page/trading/terminal-place-order.context";
import { OrderSide } from "pages/trade/binance-trade-page/trading/terminal.types";
import { useContext, useEffect, useState } from "react";

import { PlaceOrderFormSetValueType } from "../place-order.types";
import { SetSliderValueFunc } from "./trade-slider.hook";

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
  total: number;
  price: number;
  quantity: number;
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
        amount: total / price,
        tickSize: stepSize
      });
      if (isNaN(value)) return;
      if (value === quantity) return;
      if (value > 0 || String(total) === "0") {
        setValue(quantityName, value, true);

        setAutoFill(true);
      }
    } else setAutoFill(false);
  }, [total]);
  useEffect(() => {
    if (!autoFill) {
      const value = +terminalMoneyFormat({
        amount: leverage * quantity * price,
        tickSize: tickSize
      });
      if (isNaN(value)) return;
      if (value === total) return;
      if (value > 0 || String(quantity) === "0") {
        setValue(totalName, value, true);
        setAutoFill(true);

        if (side === "Sell" && sellWalletAvailable) {
          const newSliderValue = (quantity / sellWalletAvailable) * 100;
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
          amount: leverage * quantity * price,
          tickSize: tickSize
        });
        if (isNaN(value)) return;
        if (value === total) return;
        setValue(totalName, value, true);
        setAutoFill(true);
      }
    } else setAutoFill(false);
  }, [price]);
};

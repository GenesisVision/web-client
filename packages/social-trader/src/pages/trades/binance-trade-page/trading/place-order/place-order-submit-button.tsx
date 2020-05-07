import { DialogButtons } from "components/dialog/dialog-buttons";
import { SubmitButton } from "components/submit-button/submit-button";
import {
  OrderSide,
  TradeCurrency
} from "pages/trades/binance-trade-page/trading/trading.types";
import React from "react";

interface Props {
  isSuccessful?: boolean;
  side: OrderSide;
  asset: TradeCurrency;
}

const _PlaceOrderSubmitButton: React.FC<Props> = ({
  isSuccessful,
  side,
  asset
}) => {
  return (
    <DialogButtons>
      <SubmitButton
        checkDirty={false}
        isSuccessful={isSuccessful}
        color={side === "SELL" ? "danger" : "primary"}
        wide
      >
        <>
          {side} {asset}
        </>
      </SubmitButton>
    </DialogButtons>
  );
};

export const PlaceOrderSubmitButton = React.memo(_PlaceOrderSubmitButton);

import useIsOpen from "hooks/is-open.hook";
import { MarginModeDialog } from "pages/trade/binance-trade-page/trading/place-order/place-order-settings/margin-mode/margin-mode.dialog";
import { PlaceOrderSettingsButton } from "pages/trade/binance-trade-page/trading/place-order/place-order-settings/place-order-settings-button";
import { MarginModeType } from "pages/trade/binance-trade-page/trading/terminal.types";
import React from "react";

interface Props {
  onChange: (mode: MarginModeType) => void;
  mode: MarginModeType;
}

const _MarginMode: React.FC<Props> = ({ mode, onChange }) => {
  const [isOpen, setIsOpen, setIsClose] = useIsOpen();
  return (
    <>
      <PlaceOrderSettingsButton onClick={setIsOpen}>
        {mode}
      </PlaceOrderSettingsButton>
      <MarginModeDialog
        onChange={onChange}
        mode={mode}
        open={isOpen}
        onClose={setIsClose}
      />
    </>
  );
};

export const MarginMode = React.memo(_MarginMode);

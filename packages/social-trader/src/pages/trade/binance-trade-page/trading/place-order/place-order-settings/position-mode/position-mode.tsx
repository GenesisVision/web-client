import { withBlurLoader } from "decorators/with-blur-loader";
import useIsOpen from "hooks/is-open.hook";
import { PlaceOrderSettingsButton } from "pages/trade/binance-trade-page/trading/place-order/place-order-settings/place-order-settings-button";
import { PositionModeDialog } from "pages/trade/binance-trade-page/trading/place-order/place-order-settings/position-mode/position-mode.dialog";
import { PositionModeType } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useCallback } from "react";

interface Props {
  onChange: (mode: PositionModeType) => void;
  data: PositionModeType;
}

const getPositionModeName = (mode: PositionModeType): string => {
  return mode ? "Hedge mode" : "One way";
};

const _PositionMode: React.FC<Props> = ({ data, onChange }) => {
  const [isOpen, setIsOpen, setIsClose] = useIsOpen();
  const handleOnChange = useCallback(
    (mode: PositionModeType) => {
      onChange(mode);
    },
    [onChange]
  );
  return (
    <>
      <PlaceOrderSettingsButton onClick={setIsOpen}>
        {getPositionModeName(data)}
      </PlaceOrderSettingsButton>
      <PositionModeDialog
        onChange={handleOnChange}
        mode={data}
        open={isOpen}
        onClose={setIsClose}
      />
    </>
  );
};

export const PositionMode = withBlurLoader(React.memo(_PositionMode));

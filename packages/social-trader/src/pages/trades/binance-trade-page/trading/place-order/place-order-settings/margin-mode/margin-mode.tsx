import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import useIsOpen from "hooks/is-open.hook";
import { MarginModeDialog } from "pages/trades/binance-trade-page/trading/place-order/place-order-settings/margin-mode/margin-mode.dialog";
import { MarginModeType } from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useCallback } from "react";

interface Props {
  onChange: (mode: MarginModeType) => void;
  mode: MarginModeType;
}

const _MarginMode: React.FC<Props> = ({ mode, onChange }) => {
  const [isOpen, setIsOpen, setIsClose] = useIsOpen();
  const handleOnChange = useCallback(
    (mode: MarginModeType) => {
      onChange(mode);
    },
    [onChange]
  );
  return (
    <>
      <GVButton
        size={GV_BTN_SIZE.SMALL}
        variant={"outlined"}
        onClick={setIsOpen}
      >
        {mode}
      </GVButton>
      <MarginModeDialog
        onChange={handleOnChange}
        mode={mode}
        open={isOpen}
        onClose={setIsClose}
      />
    </>
  );
};

export const MarginMode = React.memo(_MarginMode);

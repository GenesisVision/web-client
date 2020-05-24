import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import { withBlurLoader } from "decorators/with-blur-loader";
import useIsOpen from "hooks/is-open.hook";
import { PositionModeDialog } from "pages/trades/binance-trade-page/trading/place-order/place-order-settings/position-mode/position-mode.dialog";
import { PositionModeType } from "pages/trades/binance-trade-page/trading/trading.types";
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
      <GVButton
        size={GV_BTN_SIZE.SMALL}
        variant={"outlined"}
        onClick={setIsOpen}
      >
        {getPositionModeName(data)}
      </GVButton>
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

import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import useIsOpen from "hooks/is-open.hook";
import { ChangeLeverageDialog } from "pages/trades/binance-trade-page/trading/place-order/place-order-settings/change-leverage/change-leverage.dialog";
import React, { useCallback } from "react";

interface Props {
  maxLeverage: number;
  onChange: (leverage: number) => void;
  leverage: number;
}

const _ChangeLeverage: React.FC<Props> = ({
  maxLeverage,
  leverage,
  onChange
}) => {
  const [isOpen, setIsOpen, setIsClose] = useIsOpen();
  const handleOnChange = useCallback(
    (leverage: number) => {
      onChange(leverage);
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
        {leverage}x
      </GVButton>
      <ChangeLeverageDialog
        maxLeverage={maxLeverage}
        onChange={handleOnChange}
        leverage={leverage}
        open={isOpen}
        onClose={setIsClose}
      />
    </>
  );
};

export const ChangeLeverage = React.memo(_ChangeLeverage);

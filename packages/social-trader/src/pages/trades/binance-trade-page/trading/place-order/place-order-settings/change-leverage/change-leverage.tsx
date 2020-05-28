import useIsOpen from "hooks/is-open.hook";
import { ChangeLeverageDialog } from "pages/trades/binance-trade-page/trading/place-order/place-order-settings/change-leverage/change-leverage.dialog";
import { PlaceOrderSettingsButton } from "pages/trades/binance-trade-page/trading/place-order/place-order-settings/place-order-settings-button";
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
      <PlaceOrderSettingsButton onClick={setIsOpen}>
        {leverage}x
      </PlaceOrderSettingsButton>
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

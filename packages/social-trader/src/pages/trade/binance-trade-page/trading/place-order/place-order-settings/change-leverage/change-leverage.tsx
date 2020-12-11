import useIsOpen from "hooks/is-open.hook";
import { ChangeLeverageDialog } from "pages/trade/binance-trade-page/trading/place-order/place-order-settings/change-leverage/change-leverage.dialog";
import { PlaceOrderSettingsButton } from "pages/trade/binance-trade-page/trading/place-order/place-order-settings/place-order-settings-button";
import { LeverageBracket } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useCallback } from "react";

interface Props {
  leverageBrackets: LeverageBracket[];
  maxLeverage: number;
  onChange: (leverage: number) => void;
  leverage: number;
}

const _ChangeLeverage: React.FC<Props> = ({
  leverageBrackets,
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
        leverageBrackets={leverageBrackets}
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

import { DefaultBlock } from "components/default.block/default.block";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { PlaceOrderSettings } from "pages/trade/binance-trade-page/trading/place-order/place-order-settings/place-order-settings";
import React, { useContext } from "react";

interface Props {}

const _PlaceOrderSettingsContainer: React.FC<Props> = () => {
  const { authData } = useContext(TerminalInfoContext);
  if (!authData) return null;
  return (
    <DefaultBlock size={"small"} roundedBorder={false} bordered>
      <PlaceOrderSettings />
    </DefaultBlock>
  );
};

export const PlaceOrderSettingsContainer = React.memo(
  _PlaceOrderSettingsContainer
);

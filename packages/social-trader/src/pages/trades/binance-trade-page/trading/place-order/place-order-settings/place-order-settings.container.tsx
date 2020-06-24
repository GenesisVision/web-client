import { DefaultBlock } from "components/default.block/default.block";
import { SIZES } from "constants/constants";
import { PlaceOrderSettings } from "pages/trades/binance-trade-page/trading/place-order/place-order-settings/place-order-settings";
import React from "react";

interface Props {}

const _PlaceOrderSettingsContainer: React.FC<Props> = () => {
  return (
    <DefaultBlock size={SIZES.SMALL} roundedBorder={false} bordered>
      <PlaceOrderSettings />
    </DefaultBlock>
  );
};

export const PlaceOrderSettingsContainer = React.memo(
  _PlaceOrderSettingsContainer
);

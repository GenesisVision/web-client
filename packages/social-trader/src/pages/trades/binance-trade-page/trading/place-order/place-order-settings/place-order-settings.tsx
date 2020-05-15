import { Center } from "components/center/center";
import { MarginModeContainer } from "pages/trades/binance-trade-page/trading/place-order/place-order-settings/margin-mode/margin-mode.container";
import React from "react";

interface Props {}

const _PlaceOrderSettings: React.FC<Props> = () => {
  return (
    <Center>
      <MarginModeContainer />
    </Center>
  );
};

export const PlaceOrderSettings = React.memo(_PlaceOrderSettings);

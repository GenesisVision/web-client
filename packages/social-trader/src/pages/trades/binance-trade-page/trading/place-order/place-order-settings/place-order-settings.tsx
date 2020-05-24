import { Center } from "components/center/center";
import { RowItem } from "components/row-item/row-item";
import { ChangeLeverageContainer } from "pages/trades/binance-trade-page/trading/place-order/place-order-settings/change-leverage/change-leverage.container";
import { MarginModeContainer } from "pages/trades/binance-trade-page/trading/place-order/place-order-settings/margin-mode/margin-mode.container";
import { PositionModeContainer } from "pages/trades/binance-trade-page/trading/place-order/place-order-settings/position-mode/position-mode.container";
import React from "react";

interface Props {}

const _PlaceOrderSettings: React.FC<Props> = () => {
  return (
    <Center>
      <RowItem>
        <MarginModeContainer />
      </RowItem>
      <RowItem>
        <ChangeLeverageContainer />
      </RowItem>
      <RowItem>
        <PositionModeContainer />
      </RowItem>
    </Center>
  );
};

export const PlaceOrderSettings = React.memo(_PlaceOrderSettings);

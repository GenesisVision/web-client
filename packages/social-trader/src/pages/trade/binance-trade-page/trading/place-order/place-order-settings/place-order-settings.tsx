import { Center } from "components/center/center";
import { RowItem } from "components/row-item/row-item";
import { ChangeLeverageContainer } from "pages/trade/binance-trade-page/trading/place-order/place-order-settings/change-leverage/change-leverage.container";
import { MarginModeContainer } from "pages/trade/binance-trade-page/trading/place-order/place-order-settings/margin-mode/margin-mode.container";
import { PositionModeContainer } from "pages/trade/binance-trade-page/trading/place-order/place-order-settings/position-mode/position-mode.container";
import React, { useContext } from "react";

import { TerminalPlaceOrderContext } from "../../contexts/terminal-place-order.context";

const _PlaceOrderSettings: React.FC = () => {
  const { positionInfo } = useContext(TerminalPlaceOrderContext);
  return (
    <Center>
      {positionInfo && (
        <RowItem size={"small"}>
          <MarginModeContainer />
        </RowItem>
      )}
      {positionInfo && (
        <RowItem size={"small"}>
          <ChangeLeverageContainer />
        </RowItem>
      )}
      <RowItem size={"small"}>
        <PositionModeContainer />
      </RowItem>
    </Center>
  );
};

export const PlaceOrderSettings = React.memo(_PlaceOrderSettings);

import { Text } from "components/text/text";
import { TradeTable } from "pages/trade/binance-trade-page/trading/components/trade-table/trade-table";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import {
  getMarginInfo,
  MARGIN_INFO_ASSET
} from "pages/trade/binance-trade-page/trading/margin-ratio/margin-ratio.helpers";
import { Position } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

import { PositionsRow } from "./positions-row";
import { POSITIONS_TABLE_COLUMNS } from "./positions.helpers";
import { StyledTh } from "pages/trade/binance-trade-page/trading/trading-tables/positions/positions.styles";

interface Props {
  items?: Position[];
}

export const Positions: React.FC<Props> = ({ items }) => {
  const [t] = useTranslation();
  const { accountInfo } = useContext(TerminalInfoContext);

  if (!accountInfo?.balances) return null;

  const { maintMargin, marginBalance } = getMarginInfo(
    accountInfo.balances,
    MARGIN_INFO_ASSET
  );

  const marginRatio =
    +marginBalance > 0 ? (+maintMargin / +marginBalance) * 100 : 0;
  return (
    <TradeTable
      columns={POSITIONS_TABLE_COLUMNS}
      items={items}
      renderHeaderCell={({ name }) => (
        <StyledTh>
          <Text muted>{t(`${name}`)}</Text>
        </StyledTh>
      )}
      renderRow={(position: Position) => (
        <PositionsRow marginRatio={marginRatio} position={position} />
      )}
    />
  );
};

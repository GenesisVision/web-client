import { Text } from "components/text/text";
import { TradeTable } from "pages/trade/binance-trade-page/trading/components/trade-table/trade-table";
import {
  getMarginInfo,
  MARGIN_INFO_ASSET
} from "pages/trade/binance-trade-page/trading/margin-ratio/margin-ratio.helpers";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import { FuturesPositionInformation } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

import { PositionsRow } from "./positions-row";
import { POSITIONS_TABLE_COLUMNS } from "./positions.helpers";
import styles from "./positions.module.scss";

interface Props {
  items?: FuturesPositionInformation[];
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
      className={styles["positions__table"]}
      columns={POSITIONS_TABLE_COLUMNS}
      items={items}
      renderHeaderCell={({ name }) => (
        <th>
          <Text muted>{t(`${name}`)}</Text>
        </th>
      )}
      renderRow={(position: FuturesPositionInformation) => (
        <PositionsRow marginRatio={marginRatio} position={position} />
      )}
    />
  );
};

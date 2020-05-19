import { MutedText } from "components/muted-text/muted-text";
import { TradeTable } from "pages/trades/binance-trade-page/trading/components/trade-table/trade-table";
import {
  getMarginInfo,
  MARGIN_INFO_ASSET
} from "pages/trades/binance-trade-page/trading/margin-ratio/margin-ratio.helpers";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import {
  FuturesPositionInformation,
  QueryOrderResult
} from "pages/trades/binance-trade-page/trading/trading.types";
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
  const { accountInfo } = useContext(TradingInfoContext);

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
          <MutedText>{t(`${name}`)}</MutedText>
        </th>
      )}
      renderRow={(position: FuturesPositionInformation) => (
        <PositionsRow marginRatio={marginRatio} position={position} />
      )}
    />
  );
};

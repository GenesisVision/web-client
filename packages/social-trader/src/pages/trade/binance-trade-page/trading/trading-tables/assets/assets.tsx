import { Text } from "components/text/text";
import { TradeTable } from "pages/trade/binance-trade-page/trading/components/trade-table/trade-table";
import React from "react";
import { useTranslation } from "react-i18next";

import { ASSETS_TABLE_COLUMNS, FuturesTableAsset } from "./assets.helpers";
import styles from "./assets.module.scss";
import { AssetsRow } from "./assets-row";

interface Props {
  bnbFuturesBalance: FuturesTableAsset;
  usdtFuturesBalance: FuturesTableAsset;
}

const _Assets: React.FC<Props> = ({
  bnbFuturesBalance,
  usdtFuturesBalance
}) => {
  const [t] = useTranslation();
  return (
    <TradeTable
      className={styles["assets__table"]}
      items={[usdtFuturesBalance, bnbFuturesBalance]}
      columns={ASSETS_TABLE_COLUMNS}
      renderHeaderCell={({ name }) => (
        <th key={name}>
          <Text muted>{t(`trade:assets.table.${name}`)}</Text>
        </th>
      )}
      renderRow={({
        asset,
        walletBalance,
        available,
        marginBalance,
        unrealizedPnl,
        logoUrl
      }: FuturesTableAsset) => (
        <AssetsRow
          key={asset}
          logoUrl={logoUrl}
          asset={asset}
          walletBalance={walletBalance}
          available={available}
          marginBalance={marginBalance}
          unrealizedPnl={unrealizedPnl}
        />
      )}
    />
  );
};

export const Assets = React.memo(_Assets);

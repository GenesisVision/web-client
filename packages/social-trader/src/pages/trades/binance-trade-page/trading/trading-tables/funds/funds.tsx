import { MutedText } from "components/muted-text/muted-text";
import { FundsRow } from "pages/trades/binance-trade-page/trading/trading-tables/funds/funds-row";
import { AssetBalance } from "pages/trades/binance-trade-page/trading/trading.types";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./funds.module.scss";

interface Props {
  items: AssetBalance[];
}

const _Funds: React.FC<Props> = ({ items }) => {
  const [t] = useTranslation();
  return (
    <table className={styles["funds__table"]}>
      <thead>
        <th>
          <MutedText>{t("coin")}</MutedText>
        </th>
        <th>
          <MutedText>{t("total")}</MutedText>
        </th>
        <th>
          <MutedText>{t("available")}</MutedText>
        </th>
        <th>
          <MutedText>{t("in-order")}</MutedText>
        </th>
        <th>
          <MutedText>{t("btc-value")}</MutedText>
        </th>
      </thead>
      <tbody>
        {items.map(({ asset, free, locked }: AssetBalance) => (
          <FundsRow asset={asset} available={free} locked={locked} />
        ))}
      </tbody>
    </table>
  );
};

export const Funds = React.memo(_Funds);

import { Text } from "components/text/text";
import { TradeTable } from "pages/trade/binance-trade-page/trading/components/trade-table/trade-table";
import { TransactionHistory as TransactionHistoryType } from "pages/trade/binance-trade-page/trading/terminal.types";
import React from "react";
import { useTranslation } from "react-i18next";

import { TRANSACTION_HISTORY_TABLE_COLUMNS } from "./transaction-history.helpers";
import styles from "./transaction-history.module.scss";
import { TransactionHistoryRow } from "./transaction-history-row";

interface Props {
  items?: TransactionHistoryType[];
}

export const TransactionHistory: React.FC<Props> = ({ items }) => {
  const [t] = useTranslation();
  return (
    <TradeTable
      className={styles["transaction-history__table"]}
      columns={TRANSACTION_HISTORY_TABLE_COLUMNS}
      loaderData={[]}
      items={items}
      renderHeaderCell={({ name }) => (
        <th>
          <Text muted>{t(`trade:transaction-history.table.${name}`)}</Text>
        </th>
      )}
      renderRow={({
        time,
        asset,
        symbol,
        incomeType,
        income
      }: TransactionHistoryType) => {
        return (
          <TransactionHistoryRow
            key={+time}
            asset={asset}
            income={income}
            incomeType={incomeType}
            symbol={symbol}
            time={time}
          />
        );
      }}
    />
  );
};

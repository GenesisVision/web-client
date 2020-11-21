import { Text } from "components/text/text";
import { TradeTable } from "pages/trade/binance-trade-page/trading/components/trade-table/trade-table";
import { UnitedOrder } from "pages/trade/binance-trade-page/trading/terminal.types";
import { TradeHistoryRow } from "pages/trade/binance-trade-page/trading/trading-tables/trade-history/trade-history-row";
import { TRADE_HISTORY_TABLE_COLUMNS } from "pages/trade/binance-trade-page/trading/trading-tables/trade-history/trade-history.helpers";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./trade-history.module.scss";

interface Props {
  items: UnitedOrder[];
}

export const TradeHistory: React.FC<Props> = ({ items }) => {
  const [t] = useTranslation();
  return (
    <TradeTable
      className={styles["trade-history__table"]}
      columns={TRADE_HISTORY_TABLE_COLUMNS}
      items={items}
      renderHeaderCell={column => (
        <th>
          <Text muted>{t(`${column.name}`)}</Text>
        </th>
      )}
      renderRow={({
        commission,
        quantity,
        time,
        symbol,
        side,
        price
      }: UnitedOrder) => (
        <TradeHistoryRow
          commission={commission}
          quantity={quantity}
          time={time}
          symbol={symbol}
          side={side}
          price={price}
          total={+quantity * +price}
        />
      )}
    />
  );
};

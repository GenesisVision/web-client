import clsx from "clsx";
import { Text } from "components/text/text";
import { TradeTable } from "pages/trade/binance-trade-page/trading/components/trade-table/trade-table";
import { FuturesOrder } from "pages/trade/binance-trade-page/trading/terminal.types";
import React from "react";
import { useTranslation } from "react-i18next";

import { OPEN_ORDERS_FUTURES_TABLE_COLUMNS } from "./open-orders.helpers";
import styles from "./open-orders.module.scss";
import { OpenOrdersFuturesRow } from "./open-orders-futures-row";

interface Props {
  items: FuturesOrder[];
}

export const OpenOrdersFutures: React.FC<Props> = ({ items }) => {
  const [t] = useTranslation();
  return (
    <TradeTable
      className={clsx(
        styles["open-orders__table"],
        styles["open-orders__table--futures"]
      )}
      columns={OPEN_ORDERS_FUTURES_TABLE_COLUMNS}
      items={items}
      renderHeaderCell={({ name }) => (
        <th key={name}>
          <Text muted>{t(`trade:open-orders.table.${name}`)}</Text>
        </th>
      )}
      renderRow={(order: FuturesOrder) => {
        return <OpenOrdersFuturesRow key={order.id} {...order} />;
      }}
    />
  );
};

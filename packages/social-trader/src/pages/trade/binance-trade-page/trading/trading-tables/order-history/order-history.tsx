import { Text } from "components/text/text";
import { TradeTable } from "pages/trade/binance-trade-page/trading/components/trade-table/trade-table";
import { UnitedOrder } from "pages/trade/binance-trade-page/trading/terminal.types";
import { OrderHistoryRow } from "pages/trade/binance-trade-page/trading/trading-tables/order-history/order-history-row";
import { ORDER_HISTORY_TABLE_COLUMNS } from "pages/trade/binance-trade-page/trading/trading-tables/order-history/order-history.helpers";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./order-history.module.scss";

interface Props {
  items: UnitedOrder[];
}

export const OrderHistory: React.FC<Props> = ({ items }) => {
  const [t] = useTranslation();
  return (
    <TradeTable
      className={styles["order-history__table"]}
      columns={ORDER_HISTORY_TABLE_COLUMNS}
      items={items}
      renderHeaderCell={column => (
        <th>
          <Text muted>{t(`${column.name}`)}</Text>
        </th>
      )}
      renderRow={({
        executedQuantity,
        quantity,
        time,
        symbol,
        type,
        side,
        price
      }: UnitedOrder) => (
        <OrderHistoryRow
          time={time}
          symbol={symbol}
          type={type}
          side={side}
          price={price}
          origQty={quantity}
          filled={(+executedQuantity / +quantity) * 100}
          total={+quantity * +price}
        />
      )}
    />
  );
};

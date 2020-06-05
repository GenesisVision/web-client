import { Text } from "components/text/text";
import { TradeTable } from "pages/trades/binance-trade-page/trading/components/trade-table/trade-table";
import { QueryOrderResult } from "pages/trades/binance-trade-page/trading/terminal.types";
import { OrderHistoryRow } from "pages/trades/binance-trade-page/trading/trading-tables/order-history/order-history-row";
import { ORDER_HISTORY_TABLE_COLUMNS } from "pages/trades/binance-trade-page/trading/trading-tables/order-history/order-history.helpers";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./order-history.module.scss";

interface Props {
  items: QueryOrderResult[];
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
        executedQty,
        origQty,
        orderId,
        time,
        symbol,
        type,
        side,
        price
      }: QueryOrderResult) => (
        <OrderHistoryRow
          orderId={orderId}
          time={time}
          symbol={symbol}
          type={type}
          side={side}
          price={price}
          origQty={origQty}
          filled={(+executedQty / +origQty) * 100}
          total={+origQty * +price}
        />
      )}
    />
  );
};

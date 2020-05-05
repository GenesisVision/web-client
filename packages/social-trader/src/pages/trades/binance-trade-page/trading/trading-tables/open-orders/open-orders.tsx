import { MutedText } from "components/muted-text/muted-text";
import { TradeTable } from "pages/trades/binance-trade-page/trading/components/trade-table/trade-table";
import { QueryOrderResult } from "pages/trades/binance-trade-page/trading/trading.types";
import React from "react";
import { useTranslation } from "react-i18next";

import { OpenOrdersRow } from "./open-orders-row";
import { OPEN_ORDERS_TABLE_COLUMNS } from "./open-orders.helpers";
import styles from "./open-orders.module.scss";

interface Props {
  items?: QueryOrderResult[];
}

export const OpenOrders: React.FC<Props> = ({ items }) => {
  const [t] = useTranslation();
  return (
    <TradeTable
      className={styles["open-orders__table"]}
      columns={OPEN_ORDERS_TABLE_COLUMNS}
      items={items}
      renderHeaderCell={column => (
        <th>
          <MutedText>{t(`${column.name}`)}</MutedText>
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
        <OpenOrdersRow
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

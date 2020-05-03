import Table from "components/table/components/table";
import { OrderHistoryRow } from "pages/trades/binance-trade-page/trading/trading-tables/order-history/order-history-row";
import { ORDER_HISTORY_TABLE_COLUMNS } from "pages/trades/binance-trade-page/trading/trading-tables/order-history/order-history.helpers";
import { QueryOrderResult } from "pages/trades/binance-trade-page/trading/trading.types";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  items: QueryOrderResult[];
}

export const OrderHistory: React.FC<Props> = ({ items }) => {
  const [t] = useTranslation();
  return (
    <Table
      columns={ORDER_HISTORY_TABLE_COLUMNS}
      items={items}
      renderHeader={column => <span>{t(`${column.name}`)}</span>}
      renderBodyRow={({
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

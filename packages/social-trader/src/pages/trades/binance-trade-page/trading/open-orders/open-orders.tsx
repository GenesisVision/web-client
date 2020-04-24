import Table from "components/table/components/table";
import { OpenOrdersRow } from "pages/trades/binance-trade-page/trading/open-orders/open-orders-row";
import { OPEN_ORDERS_TABLE_COLUMNS } from "pages/trades/binance-trade-page/trading/open-orders/open-orders.helpers";
import { QueryOrderResult } from "pages/trades/binance-trade-page/trading/trading.types";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  items: QueryOrderResult[];
}

export const OpenOrders: React.FC<Props> = ({ items }) => {
  const [t] = useTranslation();
  return (
    <Table
      title={"Open orders"}
      columns={OPEN_ORDERS_TABLE_COLUMNS}
      items={items}
      renderHeader={column => <span>{t(`${column.name}`)}</span>}
      renderBodyRow={({
        executedQty,
        origQty,
        clientOrderId,
        time,
        symbol,
        type,
        side,
        price
      }: QueryOrderResult) => (
        <OpenOrdersRow
          clientOrderId={clientOrderId}
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

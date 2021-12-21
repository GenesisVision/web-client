import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import TableModule from "components/table/components/table-module";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import { Text } from "components/text/text";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import { SpotOrder } from "pages/trade/binance-trade-page/trading/terminal.types";
import {
  ORDER_HISTORY_SPOT_TABLE_COLUMNS,
  updateSpotOrderHistoryData
} from "pages/trade/binance-trade-page/trading/trading-tables/order-history/order-history.helpers";
import { OrderHistorySpotRow } from "pages/trade/binance-trade-page/trading/trading-tables/order-history/order-history-spot-row";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";

import styles from "./order-history.module.scss";

interface Props {
  updates?: SpotOrder[];
}

export const OrderHistorySpot: React.FC<Props> = ({ updates }) => {
  const { getAllOrders } = useContext(TerminalMethodsContext);
  const { exchangeAccountId } = useContext(TerminalInfoContext);
  const [t] = useTranslation();

  const getItems = useCallback(
    (filters?: ComposeFiltersAllType) => {
      return getAllOrders({
        ...filters,
        accountId: exchangeAccountId
      });
    },
    [getAllOrders, exchangeAccountId]
  );

  return (
    <TableModule
      headerCellClassName={styles["order-history__header-cell"]}
      paging={DEFAULT_PAGING}
      updates={updates}
      updateItemsFunc={updateSpotOrderHistoryData}
      loaderData={[]}
      getItems={getItems}
      columns={ORDER_HISTORY_SPOT_TABLE_COLUMNS}
      renderHeader={column => (
        <Text wrap={false}>
          {t(`trade:order-history.table.${column.name}`)}
        </Text>
      )}
      renderBodyRow={({
        orderStatus,
        quantityFilled,
        quantity,
        time,
        symbol,
        type,
        side,
        stopPrice,
        price
      }: SpotOrder) => (
        <OrderHistorySpotRow
          executed={quantityFilled}
          amount={quantity}
          orderStatus={orderStatus}
          time={time}
          symbol={symbol}
          type={type}
          side={side}
          stopPrice={stopPrice}
          price={price}
          origQty={quantity}
          filled={quantityFilled ? (+quantityFilled / +quantity) * 100 : 0}
          total={quantityFilled ? quantity * price : 0}
        />
      )}
    />
  );
};

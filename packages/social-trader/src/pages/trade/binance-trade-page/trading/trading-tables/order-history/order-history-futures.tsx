import clsx from "clsx";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import TableModule from "components/table/components/table-module";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import { Text } from "components/text/text";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import { FuturesOrder } from "pages/trade/binance-trade-page/trading/terminal.types";
import {
  ORDER_HISTORY_FUTURES_TABLE_COLUMNS,
  updateFuturesOrderHistoryData
} from "pages/trade/binance-trade-page/trading/trading-tables/order-history/order-history.helpers";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";

import styles from "./order-history.module.scss";
import { OrderHistoryFuturesRow } from "./order-history-futures-row";

interface Props {
  updates?: FuturesOrder[];
}

export const OrderHistoryFutures: React.FC<Props> = ({ updates }) => {
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
      headerCellClassName={clsx(
        styles["order-history__header-cell"],
        styles["order-history__header-cell--futures"]
      )}
      paging={DEFAULT_PAGING}
      updates={updates}
      updateItemsFunc={updateFuturesOrderHistoryData}
      loaderData={[]}
      getItems={getItems}
      columns={ORDER_HISTORY_FUTURES_TABLE_COLUMNS}
      renderHeader={column => (
        <Text wrap={false}>
          {t(`trade:order-history.table.${column.name}`)}
        </Text>
      )}
      renderBodyRow={(order: FuturesOrder) => (
        <OrderHistoryFuturesRow {...order} />
      )}
    />
  );
};

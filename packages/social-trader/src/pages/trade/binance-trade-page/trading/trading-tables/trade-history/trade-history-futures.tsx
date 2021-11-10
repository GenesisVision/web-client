import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import TableModule from "components/table/components/table-module";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import { Text } from "components/text/text";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import { FuturesOrder } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

import {
  TRADE_HISTORY_FUTURES_TABLE_COLUMNS,
  updateTradeHistoryData
} from "./trade-history.helpers";
import styles from "./trade-history.module.scss";
import { TradeHistoryFuturesRow } from "./trade-history-futures-row";

interface Props {
  updates?: FuturesOrder[];
}

export const TradeHistoryFutures: React.FC<Props> = ({ updates }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { getAllTrades } = useContext(TerminalMethodsContext);
  const { exchangeAccountId } = useContext(TerminalInfoContext);
  const [t] = useTranslation();

  const getItems = useCallback(
    (filters?: ComposeFiltersAllType) => {
      if (!isAuthenticated) return Promise.resolve({ items: [], total: 0 });
      return getAllTrades({
        ...filters,
        accountId: exchangeAccountId
      });
    },
    [exchangeAccountId, getAllTrades]
  );

  return (
    <TableModule
      headerCellClassName={styles["trade-history__header-cell"]}
      columns={TRADE_HISTORY_FUTURES_TABLE_COLUMNS}
      paging={DEFAULT_PAGING}
      updates={updates}
      updateItemsFunc={updateTradeHistoryData}
      loaderData={[]}
      getItems={getItems}
      renderHeader={column => t(`trade:trade-history.table.${column.name}`)}
      renderBodyRow={(order: FuturesOrder) => (
        <TradeHistoryFuturesRow key={order.id} {...order} />
      )}
    />
  );
};

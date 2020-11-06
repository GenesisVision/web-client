import clsx from "clsx";
import DateRangeFilter from "components/table/components/filtering/date-range-filter/date-range-filter";
import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { composeDefaultDateRangeFilter } from "components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { SortingColumn } from "components/table/components/filtering/filter.type";
import SelectFilter from "components/table/components/filtering/select-filter/select-filter";
import { SelectFilterType } from "components/table/components/filtering/select-filter/select-filter.constants";
import TableModule from "components/table/components/table-module";
import {
  GetItemsFuncType,
  RenderBodyItemFuncType
} from "components/table/components/table.types";
import { FILTER_TYPE } from "components/table/helpers/filtering.helpers";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import { Currency } from "gv-api-web";
import { reduceFilters } from "pages/wallet/components/wallet-tables/wallet-transactions/wallet-transaction-type-filter.helpers";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { platformDataSelector } from "reducers/platform-reducer";
import { RootState } from "reducers/root-reducer";

import { fetchMultiTransactionsExternal } from "../../../services/wallet.services";
import { walletTransactionsLoaderData } from "../wallet-transactions/wallet-transactions.loader-data";
import styles from "./wallet-deposits-withdrawals.module.scss";

interface Props {
  renderBodyRow: RenderBodyItemFuncType;
  columns: SortingColumn[];
  currency?: Currency;
}

const TRANSACTIONS_FILTERS = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE
};

const DEFAULT_FILTERS = [
  { ...composeDefaultDateRangeFilter() },
  {
    name: "transactionType",
    type: FILTER_TYPE.GENERAL
  }
];

const _WalletDepositsWithdrawals: React.FC<Props> = ({
  renderBodyRow,
  columns,
  currency
}) => {
  const timestamp = useSelector(
    (state: RootState) => state.wallet.lastUpdate.timestamp
  );
  const platformData = useSelector(platformDataSelector);
  const [t] = useTranslation();
  const getMultiTransactionsExternal: GetItemsFuncType = useCallback(
    filters => fetchMultiTransactionsExternal(currency, filters),
    [currency]
  );
  if (!platformData) return null; // TODO fix filters
  const { walletExternalTransactions } = platformData.filters;
  return (
    <TableModule
      name={"WalletDepositsWithdrawals" + currency}
      cache
      loaderData={walletTransactionsLoaderData}
      timestamp={new Date(timestamp || 0).getMilliseconds()}
      defaultFilters={DEFAULT_FILTERS}
      paging={DEFAULT_PAGING}
      filtering={{
        ...TRANSACTIONS_FILTERS,
        transactionType: walletExternalTransactions[0].key
      }}
      getItems={getMultiTransactionsExternal}
      renderFilters={(updateFilter, filtering) => (
        <>
          <SelectFilter
            name={"transactionType"}
            label="Type"
            value={filtering["transactionType"] as SelectFilterType} //TODO fix filtering types
            values={reduceFilters(walletExternalTransactions)}
            onChange={updateFilter}
          />
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering[DATE_RANGE_FILTER_NAME]}
            onChange={updateFilter}
            startLabel={t("filters.date-range.account-creation")}
          />
        </>
      )}
      columns={columns}
      renderHeader={column => (
        <span
          className={clsx(
            styles["wallet-deposits-withdrawals__cell"],
            styles[`wallet-deposits-withdrawals__cell--${column.name}`]
          )}
        >
          {t(`wallet-page:deposits-withdrawals.${column.name}`)}
        </span>
      )}
      renderBodyRow={renderBodyRow}
    />
  );
};

const WalletDepositsWithdrawals = React.memo(_WalletDepositsWithdrawals);
export default WalletDepositsWithdrawals;

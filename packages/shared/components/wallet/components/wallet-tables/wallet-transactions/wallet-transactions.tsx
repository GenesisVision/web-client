import "./wallet-transactions.scss";

import { Currency, PlatformInfo } from "gv-api-web";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { composeDefaultDateRangeFilter } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import { SelectFilterType } from "shared/components/table/components/filtering/select-filter/select-filter.constants";
import TableModule from "shared/components/table/components/table-module";
import {
  GetItemsFuncType,
  RenderBodyItemFuncType
} from "shared/components/table/components/table.types";
import { FILTER_TYPE } from "shared/components/table/helpers/filtering.helpers";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { reduceFilters } from "shared/components/wallet/components/wallet-tables/wallet-transactions/wallet-transaction-type-filter.helpers";
import { platformDataSelector } from "shared/reducers/platform-reducer";
import { RootState } from "social-trader-web-portal/src/reducers/root-reducer";

import { WalletLastUpdateState } from "../../../reducers/wallet-last-update";
import { fetchMultiTransactions } from "../../../services/wallet.services";
import { walletTransactionsLoaderData } from "./wallet-transactions.loader-data";

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

const _WalletTransactions: React.FC<Props> = ({
  t,
  renderBodyRow,
  columns,
  platformData,
  timestamp,
  currency
}) => {
  const getMultiTransactions: GetItemsFuncType = useCallback(
    filters => {
      return fetchMultiTransactions(currency, filters);
    },
    [currency]
  );
  if (!platformData) return null;
  const { walletTransactions } = platformData.filters;
  return (
    <div className="wallet-transactions">
      <TableModule
        loaderData={walletTransactionsLoaderData}
        timestamp={new Date(timestamp).getMilliseconds()}
        defaultFilters={DEFAULT_FILTERS}
        paging={DEFAULT_PAGING}
        filtering={{
          ...TRANSACTIONS_FILTERS,
          transactionType: walletTransactions[0].key
        }}
        getItems={getMultiTransactions}
        renderFilters={(updateFilter, filtering) => {
          console.info(filtering);
          return (
            <>
              <SelectFilter
                name={"transactionType"}
                label="Type"
                value={filtering["transactionType"] as SelectFilterType}
                values={reduceFilters(walletTransactions)}
                onChange={updateFilter}
              />
              <DateRangeFilter
                name={DATE_RANGE_FILTER_NAME}
                value={filtering["dateRange"]}
                onChange={updateFilter}
                startLabel={t("filters.date-range.account-creation")}
              />
            </>
          );
        }}
        columns={columns}
        renderHeader={column => (
          <span
            className={`wallet-transactions__cell wallet-transactions__cell--${column.name}`}
          >
            {t(`wallet-page.transactions.${column.name}`)}
          </span>
        )}
        renderBodyRow={renderBodyRow}
      />
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  timestamp: state.wallet.lastUpdate.timestamp,
  platformData: platformDataSelector(state)
});

interface Props extends OwnProps, StateProps, WithTranslation {}

interface OwnProps {
  renderBodyRow: RenderBodyItemFuncType;
  columns: SortingColumn[];
  currency?: Currency;
}

interface StateProps extends WalletLastUpdateState {
  platformData?: PlatformInfo;
}

const WalletTransactions = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(mapStateToProps),
  React.memo
)(_WalletTransactions);
export default WalletTransactions;

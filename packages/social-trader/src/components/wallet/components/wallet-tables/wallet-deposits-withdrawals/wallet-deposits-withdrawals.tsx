import "./wallet-deposits-withdrawals.scss";

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
import { reduceFilters } from "components/wallet/components/wallet-tables/wallet-transactions/wallet-transaction-type-filter.helpers";
import { Currency, PlatformInfo } from "gv-api-web";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { platformDataSelector } from "reducers/platform-reducer";
import { RootState } from "reducers/root-reducer";
import { compose } from "redux";

import { WalletLastUpdateState } from "../../../reducers/wallet-last-update";
import { fetchMultiTransactionsExternal } from "../../../services/wallet.services";
import { walletDepositsWithdrawalsLoaderData } from "./wallet-deposits-withdrawals.loader-data";

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
  t,
  renderBodyRow,
  columns,
  platformData,
  timestamp,
  currency
}) => {
  const getMultiTransactionsExternal: GetItemsFuncType = useCallback(
    filters => fetchMultiTransactionsExternal(currency, filters),
    [currency]
  );
  if (!platformData) return null; // TODO fix filters
  const { walletExternalTransactions } = platformData.filters;
  return (
    <div className="wallet-deposits-withdrawals">
      <TableModule
        loaderData={walletDepositsWithdrawalsLoaderData}
        timestamp={timestamp.getMilliseconds()}
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
              value={filtering["dateRange"]}
              onChange={updateFilter}
              startLabel={t("filters.date-range.account-creation")}
            />
          </>
        )}
        columns={columns}
        renderHeader={column => (
          <span
            className={`wallet-deposits-withdrawals__cell wallet-deposits-withdrawals__cell--${column.name}`}
          >
            {t(`wallet-page.deposits-withdrawals.${column.name}`)}
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

const WalletDepositsWithdrawals = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(mapStateToProps),
  React.memo
)(_WalletDepositsWithdrawals);
export default WalletDepositsWithdrawals;

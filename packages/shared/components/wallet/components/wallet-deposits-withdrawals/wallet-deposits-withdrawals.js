import "./wallet-deposits-withdrawals.scss";

import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { composeDefaultDateRangeFilter } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import TableModule from "shared/components/table/components/table-module";
import { FilterType } from "shared/components/table/helpers/filtering.helpers";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { reduceFilters } from "shared/components/wallet/components/wallet-transactions/wallet-transaction-type-filter.helpers";
import { walletApi } from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";

const TRANSACTIONS_FILTERS = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE
};

const DEFAULT_FILTERS = [
  { ...composeDefaultDateRangeFilter() },
  {
    name: "type",
    type: FilterType.general
  }
];

class WalletDepositsWithdrawals extends Component {
  fetch = filters => {
    return walletApi
      .v10WalletMultiTransactionsExternalGet(authService.getAuthArg(), {
        ...filters,
        currency: this.props.currency
      })
      .then(data => ({ total: data.total, items: data.transactions }));
  };

  render() {
    const {
      t,
      createButtonToolbar,
      renderBodyRow,
      columns,
      filters
    } = this.props;
    return (
      <div className="wallet-deposits-withdrawals">
        <TableModule
          defaultFilters={DEFAULT_FILTERS}
          paging={DEFAULT_PAGING}
          filtering={{
            ...TRANSACTIONS_FILTERS,
            type: filters[0]
          }}
          createButtonToolbar={createButtonToolbar}
          getItems={this.fetch}
          renderFilters={(updateFilter, filtering) => {
            return (
              <Fragment>
                <SelectFilter
                  name={"type"}
                  label="Type"
                  value={filtering["type"]}
                  values={reduceFilters(filters)}
                  onChange={updateFilter}
                />
                <DateRangeFilter
                  name={DATE_RANGE_FILTER_NAME}
                  value={filtering["dateRange"]}
                  onChange={updateFilter}
                  startLabel={t("filters.date-range.account-creation")}
                />
              </Fragment>
            );
          }}
          columns={columns}
          renderHeader={column => (
            <span
              className={`wallet-deposits-withdrawals__cell wallet-deposits-withdrawals__cell--${
                column.name
              }`}
            >
              {t(`wallet-page.deposits-withdrawals.${column.name}`)}
            </span>
          )}
          renderBodyRow={renderBodyRow}
        />
      </div>
    );
  }
}

export default translate()(WalletDepositsWithdrawals);

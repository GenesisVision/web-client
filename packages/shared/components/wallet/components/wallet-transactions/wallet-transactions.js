import "./wallet-transactions.scss";

import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import { PORTFOLIO_EVENTS_DEFAULT_FILTERING } from "shared/components/portfolio-events-table/portfolio-events-table.constants";
import Surface from "shared/components/surface/surface";
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
import { WALLET_TRANSACTION_ACTIONS_VALUES } from "shared/components/wallet/components/wallet-list/wallet-list.constants";

import { walletApi } from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";

import { getWalletIcon } from "../wallet-currency";

const TRANSACTIONS_FILTERS = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE
};

const DEFAULT_FILTERS = [
  { ...composeDefaultDateRangeFilter() },
  {
    name: "txAction",
    type: FilterType.general
  }
];

class WalletTransactions extends Component {
  fetch = filters => {
    const { currency } = this.props;
    return walletApi
      .v10WalletTransactionsGet(authService.getAuthArg(), {
        wallet: currency,
        ...filters
      })
      .then(data => ({ total: data.total, items: data.transactions }));
  };

  renderWalletCell = () => (
    <Fragment>
      <img
        src={getWalletIcon("GVT")}
        className="wallet-transactions__icon"
        alt="Icon"
      />
      Genesis Vision
    </Fragment>
  );

  render() {
    const { t, createButtonToolbar, renderBodyRow, columns } = this.props;
    return (
      <Surface className="wallet-transactions">
        <TableModule
          defaultFilters={DEFAULT_FILTERS}
          paging={DEFAULT_PAGING}
          filtering={TRANSACTIONS_FILTERS}
          createButtonToolbar={createButtonToolbar}
          getItems={this.fetch}
          renderFilters={(updateFilter, filtering) => {
            return (
              <Fragment>
                <SelectFilter
                  name={"txAction"}
                  label="Action"
                  value={filtering["txAction"]}
                  values={WALLET_TRANSACTION_ACTIONS_VALUES}
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
              className={`wallet-transactions__cell wallet-transactions__cell--${
                column.name
              }`}
            >
              {t(`wallet-page.transactions.${column.name}`)}
            </span>
          )}
          renderBodyRow={renderBodyRow}
        />
      </Surface>
    );
  }
}

WalletTransactions.defaultProps = {
  filtering: PORTFOLIO_EVENTS_DEFAULT_FILTERING
};

export default translate()(WalletTransactions);

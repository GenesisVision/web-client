import "./wallet-copytrading.scss";

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
import TransactionDetailsPopup from "shared/modules/transaction-details/transaction-details-popup";
import TableRow from "shared/components/table/components/table-row";
import TableCell from "shared/components/table/components/table-cell";
import GVTIcon from "shared/media/currency/GVT.svg";
import moment from "moment";
import Profitability from "shared/components/profitability/profitability";
import { formatCurrencyValue } from "shared/utils/formatter";
import NumberFormat from "react-number-format";
import { WALLET_COPYTRADING_COLUMNS } from "./wallet-copytrading.constants";
import WalletCopytradingActions from "./wallet-copytrading-action-cell";
import WalletCopytradingRow from "./wallet-copytrading-row";
import AllDepositsWithdrawalsRow from "../wallet-deposits-withdrawals/all-deposits-withdrawals-row";

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

class WalletCopytrading extends Component {
  state = {
    isOpen: false
  };
  openPopup = () => {
    this.setState({ isOpen: true });
  };
  closePopup = () => {
    this.setState({ isOpen: false });
  };
  fetch = filters => {
    return walletApi
      .v10WalletMultiTransactionsExternalGet(authService.getAuthArg(), {
        ...filters,
        currency: this.props.currency
      })
      .then(data => ({ total: 8, items: [1, 2, 3, 4, 5] }));
    // .then(data => ({ total: data.total, items: data.transactions }));
  };

  render() {
    const { t, createButtonToolbar, filters } = this.props;
    return (
      <TableModule
        defaultFilters={DEFAULT_FILTERS}
        paging={DEFAULT_PAGING}
        filtering={{
          ...TRANSACTIONS_FILTERS
        }}
        createButtonToolbar={createButtonToolbar}
        getItems={this.fetch}
        /*renderFilters={(updateFilter, filtering) => {
          return (
            <Fragment>
              <SelectFilter
                name={"type"}
                label="Type"
                value={filtering["type"]}
                values={reduceFilters(
                  filters.multiWalletExternalTransactionType
                )}
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
        }}*/
        columns={WALLET_COPYTRADING_COLUMNS}
        renderHeader={column => (
          <span
            className={`wallet-copytrading__cell wallet-copytrading__cell--${
              column.name
            }`}
          >
            {t(`wallet-page.copytrading.${column.name}`)}
          </span>
        )}
        renderBodyRow={transaction => (
          <WalletCopytradingRow transaction={transaction} />
        )}
      />
    );
  }
}

export default translate()(WalletCopytrading);

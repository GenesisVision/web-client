import "./wallet-transactions.scss";

import moment from "moment";
import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { PORTFOLIO_EVENTS_DEFAULT_FILTERING } from "shared/components/portfolio-events-table/portfolio-events-table.constants";
import Surface from "shared/components/surface/surface";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { composeDefaultDateRangeFilter } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import TableCell from "shared/components/table/components/table-cell";
import TableModule from "shared/components/table/components/table-module";
import TableRow from "shared/components/table/components/table-row";
import { FilterType } from "shared/components/table/helpers/filtering.helpers";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { WALLET_TRANSACTION_ACTIONS_VALUES } from "shared/components/wallet/components/wallet-list/wallet-list.constants";
import SuccessTransactionsIcon from "shared/media/transactions/success.svg";
import { walletApi } from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";
import { formatValue } from "shared/utils/formatter";

import Profitability from "../../../profitability/profitability";
import {
  WALLET_TRANSACTIONS_COLUMNS,
  WALLET_TOTAL_TRANSACTIONS_COLUMNS
} from "./wallet-transactions.constants";
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

const renderWalletCell = typeAction => {
  typeAction = "Convert";
  if (typeAction === "Convert") {
    return (
      <Fragment>
        <span>
          <img
            src={getWalletIcon("GVT")}
            className="wallet-transactions__icon"
            alt="Icon"
          />
          Genesis Vision
        </span>
        <span>
          <img
            src={getWalletIcon("BTC")}
            className="wallet-transactions__icon"
            alt="Icon"
          />
          Bitcoin
        </span>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <img
          src={getWalletIcon("GVT")}
          className="wallet-transactions__icon"
          alt="Icon"
        />
        Genesis Vision
      </Fragment>
    );
  }
};

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

  render() {
    const { t, createButtonToolbar, isTotalWallet } = this.props;
    const columns = isTotalWallet
      ? WALLET_TOTAL_TRANSACTIONS_COLUMNS
      : WALLET_TRANSACTIONS_COLUMNS;
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
          renderBodyRow={transaction => {
            return (
              <TableRow className="wallet-transactions__row">
                {isTotalWallet && (
                  <TableCell className="wallet-transactions__cell wallet-transactions__cell--wallet">
                    {renderWalletCell(transaction.action)}
                  </TableCell>
                )}
                <TableCell className="wallet-transactions__cell wallet-transactions__cell--date">
                  {moment(transaction.date).format("DD-MM-YYYY, hh:mm a")}
                </TableCell>
                <TableCell className="wallet-transactions__cell wallet-transactions__cell--type">
                  <img
                    src={SuccessTransactionsIcon}
                    className="wallet-transactions__icon"
                    alt="TransactionsIcon"
                  />
                </TableCell>
                <TableCell className="wallet-transactions__cell wallet-transactions__cell--information">
                  {transaction.information}
                </TableCell>
                <TableCell className="wallet-transactions__cell wallet-transactions__cell--amount">
                  <Profitability value={formatValue(transaction.amount)}>
                    <NumberFormat
                      value={formatValue(transaction.amount)}
                      thousandSeparator=" "
                      displayType="text"
                      suffix=" GVT"
                    />
                  </Profitability>
                </TableCell>
              </TableRow>
            );
          }}
        />
      </Surface>
    );
  }
}

WalletTransactions.defaultProps = {
  filtering: PORTFOLIO_EVENTS_DEFAULT_FILTERING
};

export default translate()(WalletTransactions);

import "./wallet-transactions.scss";

import moment from "moment";
import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { PORTFOLIO_EVENTS_DEFAULT_FILTERING } from "shared/components/portfolio-events-table/portfolio-events-table.constants";
import Surface from "shared/components/surface/surface";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { EVENT_TYPE_FILTER_NAME } from "shared/components/table/components/filtering/event-type-filter/event-type-filter.constants";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import TableCell from "shared/components/table/components/table-cell";
import TableContainer from "shared/components/table/components/table-container";
import TableRow from "shared/components/table/components/table-row";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import EmptyTransactionsIcon from "shared/media/empty-wallet.svg";
import SuccessTransactionsIcon from "shared/media/transactions/success.svg";
import { formatValue } from "shared/utils/formatter";

import Profitability from "../../../profitability/profitability";
import { fetchWalletTransactions } from "../../services/wallet.services";
import { WALLET_TRANSACTIONS_COLUMNS } from "./wallet-transactions.constants";
import { walletTableTransactionsSelector } from "./wallet-transactions.selector";

const emptyTransactions = t => (
  <div className="empty-transactions">
    <div className="empty-transactions__subtitle">
      {t("wallet-page.transactions.title")}
    </div>
    <div className="empty-transactions__disclaimer">
      <div className="empty-transactions__icon">
        <img src={EmptyTransactionsIcon} alt="" />
      </div>
      <div className="empty-transactions__text">
        {t("wallet-page.transactions.empty-transactions")}
      </div>
    </div>
  </div>
);

class WalletTransactions extends Component {
  fetch = filters => {
    const { currency } = this.props;
    return fetchWalletTransactions({
      wallet: currency,
      ...filters
    });
  };

  render() {
    const { t, createButtonToolbar, eventTypeFilterValues } = this.props;
    return (
      <Surface className="wallet-transactions">
        <TableContainer
          isFetchOnMount
          paging={DEFAULT_PAGING}
          createButtonToolbar={createButtonToolbar}
          getItems={this.fetch}
          dataSelector={walletTableTransactionsSelector}
          renderFilters={(updateFilter, filtering) => (
            <Fragment>
              <SelectFilter
                name={EVENT_TYPE_FILTER_NAME}
                label="Type"
                value={filtering["type"]}
                values={eventTypeFilterValues}
                onChange={updateFilter}
              />
              <DateRangeFilter
                name={DATE_RANGE_FILTER_NAME}
                value={filtering["dateRange"]}
                onChange={updateFilter}
                startLabel={t("filters.date-range.account-creation")}
              />
            </Fragment>
          )}
          columns={WALLET_TRANSACTIONS_COLUMNS}
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

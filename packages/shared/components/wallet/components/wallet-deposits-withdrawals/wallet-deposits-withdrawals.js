import "./wallet-transactions.scss";

import moment from "moment";
import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { PORTFOLIO_EVENTS_DEFAULT_FILTERING } from "shared/components/portfolio-events-table/portfolio-events-table.constants";
import Profitability from "shared/components/profitability/profitability";
import Surface from "shared/components/surface/surface";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { EVENT_TYPE_FILTER_NAME } from "shared/components/table/components/filtering/event-type-filter/event-type-filter.constants";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import TableCell from "shared/components/table/components/table-cell";
import TableContainer from "shared/components/table/components/table-container";
import TableRow from "shared/components/table/components/table-row";
import EmptyTransactionsIcon from "shared/media/empty-wallet.svg";
import authService from "shared/services/auth-service";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

import * as actions from "../../actions/wallet.actions";
import { fetchWalletDepositsWithdrawals } from "../../services/wallet.services";
import { WALLET_DEPOSITS_WITHDRAWALS_COLUMNS } from "./wallet-deposits-withdrawals.constants";
import { walletTableDepositsWithdrawalsSelector } from "./wallet-deposits-withdrawals.selector";

const emptyTransactions = t => (
  <div className="empty-transactions">
    <div className="empty-transactions__subtitle">
      {t("wallet-page.deposits-withdrawals.title")}
    </div>
    <div className="empty-transactions__disclaimer">
      <div className="empty-transactions__icon">
        <img src={EmptyTransactionsIcon} alt="" />
      </div>
      <div className="empty-transactions__text">
        {t("wallet-page.deposits-withdrawals.empty-transactions")}
      </div>
    </div>
  </div>
);

class WalletDepositsWithdrawals extends Component {
  state = {
    transactionsCount: []
  };
  componentDidMount() {
    const authorization = authService.getAuthArg();
    actions.fetchWalletDepositsWithdrawals(authorization).then(res => {
      this.setState({ transactionsCount: res.total });
    });
  }

  render() {
    const { t, createButtonToolbar, eventTypeFilterValues } = this.props;
    return (
      <Surface className="wallet-deposits-withdrawals">
        {(this.state.transactionsCount && (
          <TableContainer
            isFetchOnMount
            createButtonToolbar={createButtonToolbar}
            getItems={fetchWalletDepositsWithdrawals}
            dataSelector={walletTableDepositsWithdrawalsSelector}
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
            columns={WALLET_DEPOSITS_WITHDRAWALS_COLUMNS}
            renderHeader={column => (
              <span
                className={`wallet-deposits_withdrawals__cell wallet-deposits_withdrawals__cell--${
                  column.name
                }`}
              >
                {t(`wallet-page.deposits-withdrawals.${column.name}`)}
              </span>
            )}
            renderBodyRow={transaction => {
              return (
                <TableRow className="wallet-deposits_withdrawals__row">
                  <TableCell className="wallet-deposits_withdrawals__cell wallet-deposits_withdrawals__cell--date">
                    {moment(transaction.date).format("DD-MM-YYYY, hh:mm a")}
                  </TableCell>
                  <TableCell className="wallet-deposits_withdrawals__cell wallet-deposits_withdrawals__cell--status">
                    <a href={transaction.statusUrl} target="_blank">
                      {transaction.status}
                    </a>
                  </TableCell>
                  <TableCell className="wallet-deposits_withdrawals__cell wallet-deposits_withdrawals__cell--amount">
                    <Profitability
                      value={formatCurrencyValue(
                        transaction.amount,
                        transaction.currency
                      )}
                    >
                      <NumberFormat
                        value={formatCurrencyValue(
                          transaction.amount,
                          transaction.currency
                        )}
                        thousandSeparator=" "
                        displayType="text"
                        suffix={` ${transaction.currency}`}
                      />
                    </Profitability>
                  </TableCell>
                </TableRow>
              );
            }}
          />
        )) ||
          emptyTransactions(t)}
      </Surface>
    );
  }
}

WalletDepositsWithdrawals.defaultProps = {
  filtering: PORTFOLIO_EVENTS_DEFAULT_FILTERING
};

export default translate()(WalletDepositsWithdrawals);

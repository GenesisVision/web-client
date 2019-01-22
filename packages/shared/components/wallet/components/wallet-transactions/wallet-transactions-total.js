import "./wallet-transactions.scss";

import moment from "moment";
import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import Surface from "shared/components/surface/surface";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableCell from "shared/components/table/components/table-cell";
import TableContainer from "shared/components/table/components/table-container";
import TableRow from "shared/components/table/components/table-row";
import GVTIcon from "shared/media/currency/GVT.svg";
import EmptyTransactionsIcon from "shared/media/empty-wallet.svg";
import ErrorTransactionsIcon from "shared/media/transactions/error.svg";
import PendingTransactionsIcon from "shared/media/transactions/pending.svg";
import SuccessTransactionsIcon from "shared/media/transactions/success.svg";
import authService from "shared/services/auth-service";
import { formatValue } from "shared/utils/formatter";

import Profitability from "../../../profitability/profitability";
import * as actions from "../../actions/wallet.actions";
import { fetchWalletTransactions } from "../../services/wallet.services";
import { WALLET_TOTAL_TRANSACTIONS_COLUMNS } from "./wallet-transactions.constants";
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

class WalletTransactionsTotal extends Component {
  state = {
    transactionsCount: []
  };
  componentDidMount() {
    const authorization = authService.getAuthArg();
    actions.fetchWalletTransactions(authorization).then(res => {
      this.setState({ transactionsCount: res.total });
    });
  }

  render() {
    const { t } = this.props;
    return (
      <Surface className="wallet-transactions">
        {(this.state.transactionsCount && (
          <TableContainer
            isFetchOnMount
            getItems={fetchWalletTransactions}
            dataSelector={walletTableTransactionsSelector}
            renderFilters={(updateFilter, filtering) => {
              return (
                <Fragment>
                  <DateRangeFilter
                    name={DATE_RANGE_FILTER_NAME}
                    value={filtering["dateRange"]}
                    onChange={updateFilter}
                    startLabel={t("filters.date-range.account-creation")}
                  />
                </Fragment>
              );
            }}
            columns={WALLET_TOTAL_TRANSACTIONS_COLUMNS}
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
                  <TableCell className="wallet-transactions__cell wallet-transactions__cell--wallet">
                    <img
                      src={GVTIcon}
                      className="wallet-transactions__icon"
                      alt="Icon"
                    />
                    Genesis Vision
                  </TableCell>
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
                        suffix={` ${transaction.sourceCurrency}`}
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

export default translate()(WalletTransactionsTotal);

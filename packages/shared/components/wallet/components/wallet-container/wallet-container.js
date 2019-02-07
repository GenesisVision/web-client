import "./wallet-container.scss";

import moment from "moment";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { SearchIcon } from "shared/components/icon/search-icon";
import Profitability from "shared/components/profitability/profitability";
import Surface from "shared/components/surface/surface";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import SuccessTransactionsIcon from "shared/media/transactions/success.svg";
import { formatValue } from "shared/utils/formatter";

import WalletTransactions from "../wallet-transactions/wallet-transactions";
import { WALLET_TRANSACTIONS_COLUMNS } from "../wallet-transactions/wallet-transactions.constants";

const createButtonSearch = route => (
  <div className="wallet-container__search-container">
    <Link to={route}>
      <SearchIcon />
    </Link>
  </div>
);

const renderAmountTransaction = amount => (
  <NumberFormat
    value={formatValue(amount)}
    thousandSeparator=" "
    displayType="text"
  />
);

class WalletContainer extends PureComponent {
  // @todo when add type of action "Convert" have to change from "ProgramRequestInvest" to action "Convert" in the method of below
  renderBodyRow = transaction => (
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
        {transaction.action === "ProgramRequestInvest" ? (
          renderAmountTransaction(transaction.amount)
        ) : (
          <Profitability value={formatValue(transaction.amount)}>
            {renderAmountTransaction(transaction.amount)}
          </Profitability>
        )}
      </TableCell>
    </TableRow>
  );

  render() {
    const { eventTypeFilterValues, currency } = this.props;
    return (
      <Surface className="wallet-container">
        <div className="wallet-container__header">
          <div className="wallet-container__subheading">Transactions</div>
        </div>
        <div>
          <WalletTransactions
            columns={WALLET_TRANSACTIONS_COLUMNS}
            renderBodyRow={this.renderBodyRow}
            currency={currency}
            eventTypeFilterValues={eventTypeFilterValues}
          />
        </div>
      </Surface>
    );
  }
}

export default translate()(WalletContainer);

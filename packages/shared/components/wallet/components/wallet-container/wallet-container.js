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
import { GVTab, GVTabs } from "gv-react-components";
import WalletDepositsWithdrawals from "../wallet-deposits-withdrawals/wallet-deposits-withdrawals";
import { WALLET_DEPOSITS_WITHDRAWALS_COLUMNS } from "../wallet-deposits-withdrawals/wallet-deposits-withdrawals.constants";
import DepositsWithdrawalsRow from "../wallet-deposits-withdrawals/deposits-withdrawals-row";

const TRANSACTIONS_TAB = "transactions";
const EXTERNAL_TAB = "external";

const createButtonSearch = route => (
  <div className="wallet-container__button-container">
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
  state = {
    tab: TRANSACTIONS_TAB
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

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
        {transaction.description}
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
    const { t, currency, filters } = this.props;
    const { tab } = this.state;
    return (
      <Surface className="wallet-container">
        <div className="wallet-container__header">
          <div className="wallet-container__tabs">
            <GVTabs value={tab} onChange={this.handleTabChange}>
              <GVTab
                className={filters ? "gv-tab" : "gv-tab gv-tab--disabled"}
                value={TRANSACTIONS_TAB} //TODO add disable prop
                label={t("wallet-page.tabs.transactions")}
              />
              <GVTab
                value={EXTERNAL_TAB}
                label={t("wallet-page.tabs.external")}
              />
            </GVTabs>
          </div>
        </div>
        <div>
          {tab === TRANSACTIONS_TAB && (
            <WalletTransactions
              filters={filters}
              columns={WALLET_TRANSACTIONS_COLUMNS}
              renderBodyRow={this.renderBodyRow}
              currency={currency}
            />
          )}
          {tab === EXTERNAL_TAB && (
            <WalletDepositsWithdrawals
              columns={WALLET_DEPOSITS_WITHDRAWALS_COLUMNS}
              filters={filters}
              renderBodyRow={transaction => (
                <DepositsWithdrawalsRow transaction={transaction} />
              )}
              currency={currency}
            />
          )}
        </div>
      </Surface>
    );
  }
}

export default translate()(WalletContainer);

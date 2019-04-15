import "./wallet-container.scss";

import { GVTab, GVTabs } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import Surface from "shared/components/surface/surface";
import { WALLET_TOTAL_PAGE_ROUTE } from "shared/components/wallet/wallet.routes";

import GVScroll from "../../../scroll/gvscroll";
import DepositsWithdrawalsRow from "../wallet-deposits-withdrawals/deposits-withdrawals-row";
import WalletDepositsWithdrawals from "../wallet-deposits-withdrawals/wallet-deposits-withdrawals";
import { WALLET_DEPOSITS_WITHDRAWALS_COLUMNS } from "../wallet-deposits-withdrawals/wallet-deposits-withdrawals.constants";
import TransactionsRow from "../wallet-transactions/transactions-row";
import WalletTransactions from "../wallet-transactions/wallet-transactions";
import { WALLET_TRANSACTIONS_COLUMNS } from "../wallet-transactions/wallet-transactions.constants";

const TRANSACTIONS_TAB = "";
const EXTERNAL_TAB = "#external";

class WalletContainer extends PureComponent {
  state = {
    tab: TRANSACTIONS_TAB
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  static getDerivedStateFromProps(nextProps) {
    return {
      tab: nextProps.location.hash
    };
  }

  render() {
    const { t, currency, filters, location } = this.props;
    const { tab } = this.state;
    return (
      <Surface className="wallet-container">
        <div className="wallet-container__header">
          <div className="wallet-container__tabs">
            <GVScroll autoHide autoHeight autoHeightMax={60}>
              <GVTabs value={tab} onChange={this.handleTabChange}>
                <GVTab
                  className={filters ? "gv-tab" : "gv-tab gv-tab--disabled"}
                  value={TRANSACTIONS_TAB} //TODO add disable prop
                  label={
                    <Link
                      to={{
                        prevPath: WALLET_TOTAL_PAGE_ROUTE,
                        pathname: location.pathname,
                        state: t("wallet-page.title")
                      }}
                    >
                      {t("wallet-page.tabs.transactions")}
                    </Link>
                  }
                />
                <GVTab
                  value={EXTERNAL_TAB}
                  label={
                    <Link
                      to={{
                        prevPath: WALLET_TOTAL_PAGE_ROUTE,
                        hash: EXTERNAL_TAB,
                        state: t("wallet-page.title")
                      }}
                    >
                      {t("wallet-page.tabs.external")}
                    </Link>
                  }
                />
              </GVTabs>
            </GVScroll>
          </div>
        </div>
        <div>
          {tab === TRANSACTIONS_TAB && (
            <WalletTransactions
              typeFilterValues={filters.transactionType}
              columns={WALLET_TRANSACTIONS_COLUMNS}
              renderBodyRow={(transaction, updateRow, updateItems) => (
                <TransactionsRow
                  transaction={transaction}
                  walletCurrency={currency}
                  update={updateItems}
                />
              )}
              currency={currency}
            />
          )}
          {tab === EXTERNAL_TAB && (
            <WalletDepositsWithdrawals
              columns={WALLET_DEPOSITS_WITHDRAWALS_COLUMNS}
              typeFilterValues={filters.externalTransactionType}
              renderBodyRow={(transaction, updateRow, updateItems) => (
                <DepositsWithdrawalsRow
                  transaction={transaction}
                  update={updateItems}
                />
              )}
              currency={currency}
            />
          )}
        </div>
      </Surface>
    );
  }
}

export default compose(
  translate(),
  withRouter
)(WalletContainer);

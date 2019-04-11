import "./wallet-container.scss";

import { GVTab, GVTabs } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import GVScroll from "shared/components/scroll/gvscroll";
import Surface from "shared/components/surface/surface";

import WalletCopytrading from "../wallet-copytrading/wallet-copytrading";
import AllDepositsWithdrawalsRow from "../wallet-deposits-withdrawals/all-deposits-withdrawals-row";
import WalletDepositsWithdrawals from "../wallet-deposits-withdrawals/wallet-deposits-withdrawals";
import { WALLET_TOTAL_DEPOSITS_WITHDRAWALS_COLUMNS } from "../wallet-deposits-withdrawals/wallet-deposits-withdrawals.constants";
import WalletList from "../wallet-list/wallet-list";
import TransactionsRow from "../wallet-transactions/transactions-row";
import WalletTransactions from "../wallet-transactions/wallet-transactions";
import { WALLET_TOTAL_TRANSACTIONS_COLUMNS } from "../wallet-transactions/wallet-transactions.constants";

const WALLETS_TAB = "";
const COPYTRADING_TAB = "#copytrading";
const TRANSACTIONS_TAB = "#transactions";
const EXTERNAL_TAB = "#external";

class WalletContainerTotal extends PureComponent {
  state = {
    tab: WALLETS_TAB
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
    const { tab } = this.state;
    const { t, wallets, filters, copytrading, location } = this.props;
    console.log(this.props);
    return (
      <Surface className="wallet-container">
        <div className="wallet-container__header">
          <div className="wallet-container__tabs">
            <GVScroll autoHide autoHeight autoHeightMax={60}>
              <GVTabs value={tab} onChange={this.handleTabChange}>
                <GVTab
                  value={WALLETS_TAB}
                  label={
                    <Link to={location.pathname}>
                      {t("wallet-page.tabs.wallets")}
                    </Link>
                  }
                />
                <GVTab
                  visible={copytrading}
                  value={COPYTRADING_TAB}
                  label={
                    <Link
                      to={{
                        hash: TRANSACTIONS_TAB
                      }}
                    >
                      {t("wallet-page.tabs.copytrading")}
                    </Link>
                  }
                />
                <GVTab
                  className={filters ? "gv-tab" : "gv-tab gv-tab--disabled"}
                  value={TRANSACTIONS_TAB} //TODO add disable prop
                  label={
                    <Link
                      to={{
                        hash: TRANSACTIONS_TAB
                      }}
                    >
                      {t("wallet-page.tabs.transactions")}
                    </Link>
                  }
                />
                <GVTab
                  className={filters ? "gv-tab" : "gv-tab gv-tab--disabled"}
                  value={EXTERNAL_TAB}
                  label={
                    <Link
                      to={{
                        hash: EXTERNAL_TAB
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
        {tab === WALLETS_TAB && <WalletList wallets={wallets} />}
        {tab === COPYTRADING_TAB && <WalletCopytrading />}
        {tab === TRANSACTIONS_TAB && (
          <WalletTransactions
            columns={WALLET_TOTAL_TRANSACTIONS_COLUMNS}
            filters={filters.transactionType}
            renderBodyRow={(transaction, updateRow, updateItems) => (
              <TransactionsRow transaction={transaction} update={updateItems} />
            )}
          />
        )}
        {tab === EXTERNAL_TAB && (
          <WalletDepositsWithdrawals
            columns={WALLET_TOTAL_DEPOSITS_WITHDRAWALS_COLUMNS}
            filters={filters.externalTransactionType}
            renderBodyRow={(transaction, updateRow, updateItems) => (
              <AllDepositsWithdrawalsRow
                transaction={transaction}
                update={updateItems}
              />
            )}
          />
        )}
      </Surface>
    );
  }
}

export default compose(
  translate(),
  withRouter
)(WalletContainerTotal);

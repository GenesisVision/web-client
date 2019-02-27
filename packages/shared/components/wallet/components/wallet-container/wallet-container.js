import "./wallet-container.scss";

import { GVTab, GVTabs } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import Surface from "shared/components/surface/surface";

import GVScroll from "../../../scroll/gvscroll";
import DepositsWithdrawalsRow from "../wallet-deposits-withdrawals/deposits-withdrawals-row";
import WalletDepositsWithdrawals from "../wallet-deposits-withdrawals/wallet-deposits-withdrawals";
import { WALLET_DEPOSITS_WITHDRAWALS_COLUMNS } from "../wallet-deposits-withdrawals/wallet-deposits-withdrawals.constants";
import TransactionsRow from "../wallet-transactions/transactions-row";
import WalletTransactions from "../wallet-transactions/wallet-transactions";
import { WALLET_TRANSACTIONS_COLUMNS } from "../wallet-transactions/wallet-transactions.constants";

const TRANSACTIONS_TAB = "transactions";
const EXTERNAL_TAB = "external";

class WalletContainer extends PureComponent {
  state = {
    tab: TRANSACTIONS_TAB
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  render() {
    const { t, currency, filters } = this.props;
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
                  label={t("wallet-page.tabs.transactions")}
                />
                <GVTab
                  value={EXTERNAL_TAB}
                  label={t("wallet-page.tabs.external")}
                />
              </GVTabs>
            </GVScroll>
          </div>
        </div>
        <div>
          {tab === TRANSACTIONS_TAB && (
            <WalletTransactions
              filters={filters.transactionType}
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
              filters={filters.externalTransactionType}
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

export default translate()(WalletContainer);

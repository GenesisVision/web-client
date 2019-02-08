import "./wallet-container.scss";

import { GVTab, GVTabs } from "gv-react-components";
import moment from "moment";
import React, { Fragment, PureComponent } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { SearchIcon } from "shared/components/icon/search-icon";
import Profitability from "shared/components/profitability/profitability";
import Surface from "shared/components/surface/surface";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { reduceFilters } from "shared/components/wallet/components/wallet-transactions/wallet-transaction-type-filter.helpers";
import SuccessTransactionsIcon from "shared/media/transactions/success.svg";
import { TransactionDetails } from "shared/modules/transaction-details/transaction-details";
import TransactionDetailsPopup from "shared/modules/transaction-details/transaction-details-popup";
import { formatValue } from "shared/utils/formatter";

import { getWalletIcon } from "../wallet-currency";
import WalletList from "../wallet-list/wallet-list";
import AllTransactionsRow from "../wallet-transactions/all-transactions-row";
import WalletTransactions from "../wallet-transactions/wallet-transactions";
import { WALLET_TOTAL_TRANSACTIONS_COLUMNS } from "../wallet-transactions/wallet-transactions.constants";
import { WALLET_TOTAL_DEPOSITS_WITHDRAWALS_COLUMNS } from "../wallet-deposits-withdrawals/wallet-deposits-withdrawals.constants";
import AllDepositsWithdrawalsRow from "../wallet-deposits-withdrawals/all-deposits-withdrawals-row";
import WalletDepositsWithdrawals from "../wallet-deposits-withdrawals/wallet-deposits-withdrawals";
import WalletCopytrading from "../wallet-copytrading/wallet-copytrading";

const WALLETS_TAB = "wallets";
const COPYTRADING_TAB = "copytrading";
const TRANSACTIONS_TAB = "transactions";
const EXTERNAL_TAB = "external";

class WalletContainerTotal extends PureComponent {
  state = {
    tab: WALLETS_TAB
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  render() {
    const { tab } = this.state;
    const { t, wallets, filters } = this.props;
    return (
      <Surface className="wallet-container">
        <div className="wallet-container__header">
          <div className="wallet-container__tabs">
            <GVTabs value={tab} onChange={this.handleTabChange}>
              <GVTab
                value={WALLETS_TAB}
                label={t("wallet-page.tabs.wallets")}
              />
              <GVTab value={COPYTRADING_TAB} label={t("wallet-page.tabs.copytrading")} />

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
          {tab === WALLETS_TAB && <WalletList wallets={wallets} />}
          {tab === COPYTRADING_TAB && <WalletCopytrading />}
          {tab === TRANSACTIONS_TAB && (
            <WalletTransactions
              columns={WALLET_TOTAL_TRANSACTIONS_COLUMNS}
              filters={filters}
              renderBodyRow={transaction => (
                <AllTransactionsRow transaction={transaction} />
              )}
            />
          )}
          {tab === EXTERNAL_TAB && (
            <WalletDepositsWithdrawals
              columns={WALLET_TOTAL_DEPOSITS_WITHDRAWALS_COLUMNS}
              filters={filters}
              renderBodyRow={transaction => (
                <AllDepositsWithdrawalsRow transaction={transaction} />
              )}
            />
          )}
        </div>
      </Surface>
    );
  }
}

export default translate()(WalletContainerTotal);

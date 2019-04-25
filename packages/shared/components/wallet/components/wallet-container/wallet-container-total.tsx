import "./wallet-container.scss";

import {
  CopyTradingAccountInfo,
  MultiWalletFilters,
  WalletData
} from "gv-api-web";
import { GVTab, GVTabs } from "gv-react-components";
import { Location } from "history";
import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
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

class _WalletContainerTotal extends React.PureComponent<Props, State> {
  state = {
    tab: TABS.WALLETS_TAB
  };

  handleTabChange = (e: React.SyntheticEvent<EventTarget>, tab: string) => {
    this.setState({ tab: tab as TABS });
  };

  static getDerivedStateFromProps(nextProps: Props) {
    return {
      tab: nextProps.location.hash
    };
  }

  render() {
    const { tab } = this.state;
    const {
      isPending,
      t,
      wallets,
      filters,
      copytrading,
      location,
      copyTradingAccounts
    } = this.props;
    return (
      <Surface className="wallet-container">
        <div className="wallet-container__header">
          <div className="wallet-container__tabs">
            <GVScroll autoHide autoHeight autoHeightMax={60}>
              <GVTabs value={tab} onChange={this.handleTabChange}>
                <GVTab
                  value={TABS.WALLETS_TAB}
                  label={
                    <Link to={location.pathname}>
                      {t("wallet-page.tabs.wallets")}
                    </Link>
                  }
                />
                <GVTab
                  className={filters ? "gv-tab" : "gv-tab gv-tab--disabled"}
                  visible={copytrading}
                  value={TABS.COPYTRADING_TAB}
                  label={
                    <Link
                      to={{
                        hash: TABS.COPYTRADING_TAB
                      }}
                    >
                      {t("wallet-page.tabs.copytrading")}
                    </Link>
                  }
                />
                <GVTab
                  className={filters ? "gv-tab" : "gv-tab gv-tab--disabled"}
                  value={TABS.TRANSACTIONS_TAB} //TODO add disable prop
                  label={
                    <Link
                      to={{
                        hash: TABS.TRANSACTIONS_TAB
                      }}
                    >
                      {t("wallet-page.tabs.transactions")}
                    </Link>
                  }
                />
                <GVTab
                  className={filters ? "gv-tab" : "gv-tab gv-tab--disabled"}
                  value={TABS.EXTERNAL_TAB}
                  label={
                    <Link
                      to={{
                        hash: TABS.EXTERNAL_TAB
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
        {tab === TABS.WALLETS_TAB && <WalletList wallets={wallets} />}
        {tab === TABS.COPYTRADING_TAB && (
          <WalletCopytrading
            copyTradingAccounts={copyTradingAccounts}
            isPending={isPending}
          />
        )}
        {tab === TABS.TRANSACTIONS_TAB && (
          <WalletTransactions
            columns={WALLET_TOTAL_TRANSACTIONS_COLUMNS}
            typeFilterValues={filters.transactionType}
            renderBodyRow={(transaction, updateRow, updateItems) => (
              <TransactionsRow transaction={transaction} update={updateItems} />
            )}
          />
        )}
        {tab === TABS.EXTERNAL_TAB && (
          <WalletDepositsWithdrawals
            columns={WALLET_TOTAL_DEPOSITS_WITHDRAWALS_COLUMNS}
            typeFilterValues={filters.externalTransactionType}
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

enum TABS {
  WALLETS_TAB = "",
  COPYTRADING_TAB = "#copytrading",
  TRANSACTIONS_TAB = "#transactions",
  EXTERNAL_TAB = "#external"
}

interface Props extends InjectedTranslateProps, OwnProps {
  location: Location;
}

interface OwnProps {
  isPending: boolean;
  wallets: WalletData[];
  filters: MultiWalletFilters;
  copytrading: boolean;
  copyTradingAccounts: CopyTradingAccountInfo[];
}

interface State {
  tab: TABS;
}

const WalletContainerTotal = compose<React.ComponentType<OwnProps>>(
  translate(),
  withRouter
)(_WalletContainerTotal);
export default WalletContainerTotal;

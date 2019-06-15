import "./wallet-tables.scss";

import { CopyTradingAccountInfo, WalletData } from "gv-api-web";
import { Location } from "history";
import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import { HORIZONTAL_POPOVER_POS } from "shared/components/popover/popover";
import GVScroll from "shared/components/scroll/gvscroll";
import Surface from "shared/components/surface/surface";
import Tooltip from "shared/components/tooltip/tooltip";

import WalletList from "../wallet-list/wallet-list";
import TransactionsRow from "../wallet-transactions/transactions-row";
import WalletTransactions from "../wallet-transactions/wallet-transactions";
import { WALLET_TOTAL_TRANSACTIONS_COLUMNS } from "../wallet-transactions/wallet-transactions.constants";
import WalletCopytrading from "./wallet-copytrading/wallet-copytrading";
import AllDepositsWithdrawalsRow from "./wallet-deposits-withdrawals/all-deposits-withdrawals-row";
import WalletDepositsWithdrawals from "./wallet-deposits-withdrawals/wallet-deposits-withdrawals";
import { WALLET_TOTAL_DEPOSITS_WITHDRAWALS_COLUMNS } from "./wallet-deposits-withdrawals/wallet-deposits-withdrawals.constants";

class _WalletTablesTotal extends React.PureComponent<Props, State> {
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
      t,
      wallets,
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
                  className={"gv-tab"}
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
                  className={"gv-tab"}
                  value={TABS.TRANSACTIONS_TAB} //TODO add disable prop
                  label={
                    <Link
                      to={{
                        hash: TABS.TRANSACTIONS_TAB
                      }}
                    >
                      <Tooltip
                        horizontal={HORIZONTAL_POPOVER_POS.LEFT}
                        render={() => (
                          <div className="tooltip__content">
                            {t("wallet-page.tooltip.transactions")}
                          </div>
                        )}
                      >
                        <span>{t("wallet-page.tabs.transactions")}</span>
                      </Tooltip>
                    </Link>
                  }
                />
                <GVTab
                  className={"gv-tab"}
                  value={TABS.EXTERNAL_TAB}
                  label={
                    <Link
                      to={{
                        hash: TABS.EXTERNAL_TAB
                      }}
                    >
                      <Tooltip
                        horizontal={HORIZONTAL_POPOVER_POS.LEFT}
                        render={() => (
                          <div className="tooltip__content">
                            {t("wallet-page.tooltip.deposit")}
                          </div>
                        )}
                      >
                        <span>{t("wallet-page.tabs.deposit")}</span>
                      </Tooltip>
                      <Tooltip
                        horizontal={HORIZONTAL_POPOVER_POS.LEFT}
                        render={() => (
                          <div className="tooltip__content">
                            {t("wallet-page.tooltip.withdrawals")}
                          </div>
                        )}
                      >
                        <span>{t("wallet-page.tabs.withdrawals")}</span>
                      </Tooltip>
                    </Link>
                  }
                />
              </GVTabs>
            </GVScroll>
          </div>
        </div>
        {tab === TABS.WALLETS_TAB && <WalletList wallets={wallets} />}
        {tab === TABS.COPYTRADING_TAB && (
          <WalletCopytrading copyTradingAccounts={copyTradingAccounts} />
        )}
        {tab === TABS.TRANSACTIONS_TAB && (
          <WalletTransactions
            columns={WALLET_TOTAL_TRANSACTIONS_COLUMNS}
            renderBodyRow={(transaction, updateRow, updateItems) => (
              <TransactionsRow transaction={transaction} update={updateItems} />
            )}
          />
        )}
        {tab === TABS.EXTERNAL_TAB && (
          <WalletDepositsWithdrawals
            columns={WALLET_TOTAL_DEPOSITS_WITHDRAWALS_COLUMNS}
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
  wallets: WalletData[];
  copytrading: boolean;
  copyTradingAccounts: CopyTradingAccountInfo[];
}

interface State {
  tab: TABS;
}

const WalletContainerTotal = compose<React.ComponentType<OwnProps>>(
  translate(),
  withRouter
)(_WalletTablesTotal);
export default WalletContainerTotal;

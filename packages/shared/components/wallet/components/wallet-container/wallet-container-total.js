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
import SuccessTransactionsIcon from "shared/media/transactions/success.svg";
import { formatValue } from "shared/utils/formatter";

import { getWalletIcon } from "../wallet-currency";
import WalletList from "../wallet-list/wallet-list";
import WalletTransactions from "../wallet-transactions/wallet-transactions";
import { WALLET_TOTAL_TRANSACTIONS_COLUMNS } from "../wallet-transactions/wallet-transactions.constants";
import { TransactionDetails } from "shared/modules/transaction-details/transaction-details";
import TransactionDetailsPopup from "shared/modules/transaction-details/transaction-details-popup";
import AllTransactionsRow from "../wallet-transactions/all-transactions-row";

const WALLETS_TAB = "wallets";
const COPYTRADING_TAB = "copytrading";
const TRANSACTIONS_TAB = "transactions";
const EXTERNAL_TAB = "external";

class WalletContainerTotal extends PureComponent {
  state = {
    tab: TRANSACTIONS_TAB
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  render() {
    const { tab } = this.state;
    const { t, wallets } = this.props;
    return (
      <Surface className="wallet-container">
        <div className="wallet-container__header">
          <div className="wallet-container__tabs">
            <GVTabs value={tab} onChange={this.handleTabChange}>
              <GVTab
                value={WALLETS_TAB}
                label={t("wallet-page.tabs.wallets")}
              />
              {/*<GVTab value={COPYTRADING_TAB} label={t("wallet-page.tabs.copytrading")} />*/}
              <GVTab
                value={TRANSACTIONS_TAB}
                label={t("wallet-page.tabs.transactions")}
              />
              {/*<GVTab value={EXTERNAL_TAB} label={t("wallet-page.tabs.external")} />*/}
            </GVTabs>
          </div>
        </div>
        <div>
          {tab === WALLETS_TAB && <WalletList wallets={wallets} />}
          {tab === TRANSACTIONS_TAB && (
            <WalletTransactions
              columns={WALLET_TOTAL_TRANSACTIONS_COLUMNS}
              renderBodyRow={transaction => (
                <AllTransactionsRow transaction={transaction} />
              )}
            />
          )}
          {/*{tab === EXTERNAL_TAB && (*/}
          {/*)}*/}
        </div>
      </Surface>
    );
  }
}

export default translate()(WalletContainerTotal);

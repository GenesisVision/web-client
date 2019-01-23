import "./wallet-total.scss";

import { GVTab, GVTabs } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
// import GVButton from "gv-react-components/dist/gv-button";
import { SearchIcon } from "shared/components/icon/search-icon";
import Surface from "shared/components/surface/surface";

import WalletList from "../wallet-list/wallet-list";
import WalletTransactionsTotal from "../wallet-transactions/wallet-transactions-total";

const WALLETS_TAB = "wallets";
const TRANSACTIONS_TAB = "transactions";

class WalletTotal extends PureComponent {
  state = {
    tab: WALLETS_TAB
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  createButtonSearch = route => (
    <div className="wallet-total__button-container">
      <Link to={route}>
        <SearchIcon />
      </Link>
    </div>
  );

  render() {
    const { tab } = this.state;
    return (
      <Surface className="wallet-total">
        <div className="wallet-total__header">
          <div className="wallet-total__tabs">
            <GVTabs value={tab} onChange={this.handleTabChange}>
              <GVTab value={WALLETS_TAB} label={"My wallets"} />
              <GVTab value={TRANSACTIONS_TAB} label={"All transactions"} />
            </GVTabs>
          </div>
        </div>
        <div>
          {tab === WALLETS_TAB && (
            <WalletList createButtonToolbar={this.createButtonSearch("")} />
          )}
          {tab === TRANSACTIONS_TAB && (
            <WalletTransactionsTotal
              createButtonToolbar={this.createButtonSearch("")}
            />
          )}
        </div>
      </Surface>
    );
  }
}

export default translate()(WalletTotal);

import "../wallet-total/wallet-total.scss";

import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { SearchIcon } from "shared/components/icon/search-icon";
import Surface from "shared/components/surface/surface";

import WalletTransactions from "../wallet-transactions/wallet-transactions";

const createButtonSearch = route => (
  <div className="wallet-total__button-container">
    <Link to={route}>
      <SearchIcon />
    </Link>
  </div>
);

class WalletInfo extends PureComponent {
  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  render() {
    return (
      <Surface className="wallet-total">
        <div className="wallet-total__header">
          <div className="wallet-total__subheading">Transactions</div>
        </div>
        <div>
          <WalletTransactions createButtonToolbar={createButtonSearch("/")} />
        </div>
      </Surface>
    );
  }
}

export default translate()(WalletInfo);

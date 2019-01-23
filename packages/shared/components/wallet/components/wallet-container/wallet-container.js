import "./wallet-container.scss";

import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { SearchIcon } from "shared/components/icon/search-icon";
import Surface from "shared/components/surface/surface";

import WalletTransactions from "../wallet-transactions/wallet-transactions";

const createButtonSearch = route => (
  <div className="wallet-container__button-container">
    <Link to={route}>
      <SearchIcon />
    </Link>
  </div>
);

class WalletContainer extends PureComponent {
  render() {
    const { eventTypeFilterValues } = this.props;
    return (
      <Surface className="wallet-container">
        <div className="wallet-container__header">
          <div className="wallet-container__subheading">Transactions</div>
        </div>
        <div>
          <WalletTransactions
            eventTypeFilterValues={eventTypeFilterValues}
            createButtonToolbar={createButtonSearch("/")}
          />
        </div>
      </Surface>
    );
  }
}

export default translate()(WalletContainer);

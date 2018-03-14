import { connect } from "react-redux";
import React, { Component } from "react";

import WalletPane from "./wallet-pane/wallet-pane";
import walletPaneActions from "../../actions/wallet-pane-actions";

import "./wallet-pane-container.css";

class WalletPaneContainer extends Component {
  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.fetchTransactions();
    }
  }

  render() {
    const { isAuthenticated, transactions, isPending } = this.props;
    if (!isAuthenticated || !transactions) {
      return null;
    }
    if (isPending) {
      return <div>Loading...</div>;
    }

    return (
      isAuthenticated && (
        <div className="wallet-pane-container__wallet">
          <WalletPane transactions={transactions.items} />
        </div>
      )
    );
  }
}

const mapStateToProps = state => {
  const { isAuthenticated } = state.authData;
  const { isPending, data } = state.walletPaneData.transactions;

  let transactions;
  if (data) {
    transactions = {
      items: data.transactions,
      total: data.total
    };
  }
  return { isAuthenticated, isPending, transactions };
};

const mapDispatchToProps = dispatch => ({
  fetchTransactions: () => {
    dispatch(walletPaneActions.fetchWalletPaneTransactions());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  WalletPaneContainer
);

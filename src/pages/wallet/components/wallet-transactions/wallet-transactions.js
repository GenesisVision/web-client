import "./program-details-chart.scss";

import Surface from "components/surface/surface";
import React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";

import { fetchWalletTransactions } from "../../services/wallet.services";

const WalletTransactions = ({ t }) => (
  <Surface className="wallet-transactions-container">
    wallet-transactions-table
  </Surface>
);

const mapStateToProps = state => {
  const { isAuthenticated } = state.authData;
  const { isPending, data } = state.programsData.items;
  return { isPending, data, isAuthenticated };
};

const mapDispatchToProps = dispatch => ({
  getItems: fetchWalletTransactions
});

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(WalletTransactions);

import { connect } from "react-redux";
import React from "react";

import WalletPane from "./wallet-pane/wallet-pane";

import "./wallet-pane-container.css";

const WalletPaneContainer = ({ isAuthenticated, children }) => {
  return (
    <div className="wallet-pane-container">
      <div className="wallet-pane-container__component">{children}</div>
      {isAuthenticated && (
        <div className="wallet-pane-container__wallet">
          <WalletPane />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.authData;
  return { isAuthenticated };
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(
  WalletPaneContainer
);

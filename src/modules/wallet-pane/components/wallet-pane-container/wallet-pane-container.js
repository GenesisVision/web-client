import { connect } from "react-redux";
import React, { PureComponent } from "react";

import WalletPane from "./wallet-pane/wallet-pane";

import "./wallet-pane-container.css";

class WalletPaneContainer extends PureComponent {
  render() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return null;
    }

    return (
      <div className="wallet-pane-container__wallet">
        <WalletPane />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { isAuthenticated } = state.authData;

  return { isAuthenticated };
};

export default connect(mapStateToProps)(WalletPaneContainer);

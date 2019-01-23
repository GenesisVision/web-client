import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import * as WalletServices from "../../services/wallet.services";
import WalletBalanceElements from "./wallet-balance-elements";
import WalletBalanceLoader from "./wallet-balance-loader";

class WalletBalanceTotal extends Component {
  componentDidMount() {
    const { service } = this.props;
    service.fetchWalletBalance();
  }

  componentDidUpdate(prevProps) {
    const { service, currency } = this.props;
    if (currency !== prevProps.currency) {
      service.fetchWalletBalance();
    }
  }

  render() {
    const { t, walletBalanceData, currency } = this.props;

    return (
      <Fragment>
        <div className="wallet-balance">
          <h1>{t("wallet-page.title")}</h1>
          {!walletBalanceData ? (
            <WalletBalanceLoader />
          ) : (
            <WalletBalanceElements
              walletBalanceData={walletBalanceData}
              currentCurrency={currency}
            />
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    walletBalanceData: state.wallet.balance.data,
    currency: state.accountSettings.currency
  };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(WalletServices, dispatch)
});

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(WalletBalanceTotal);

import React, { Component } from "react";
import { connect } from "react-redux";
import WalletWidget from "shared/components/wallet-widget/wallet-widget";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";

class WalletWidgetContainer extends Component {
  getWallets = () => {
    this.props.fetchWallets();
  };

  componentDidMount() {
    this.getWallets();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currency !== this.props.currency) {
      this.getWallets();
    }
  }

  render() {
    const { className, info } = this.props;
    const {
      currencyCcy,
      availableCcy,
      investedCcy,
      pendingCcy,
      totalCcy
    } = info;
    return (
      <WalletWidget
        className={className}
        currency={currencyCcy}
        available={availableCcy}
        invested={investedCcy}
        pending={pendingCcy}
        totalBalance={totalCcy}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    currency: state.accountSettings.currency,
    info: state.wallet.info.data ? state.wallet.info.data.grandTotal : {}
  };
};

export default connect(
  mapStateToProps,
  { fetchWallets }
)(WalletWidgetContainer);

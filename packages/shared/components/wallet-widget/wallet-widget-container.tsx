import { WalletsGrandTotal } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import WalletWidget from "shared/components/wallet-widget/wallet-widget";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import RootState from "shared/reducers/root-reducer";

import { WalletWidgetLoader } from "./wallet-widget.loader";

class WalletWidgetContainer extends React.Component<
  IWalletWidgetContainerProps & IWalletWidgetContainerStateProps
> {
  getWallets = () => {
    this.props.fetchWallets();
  };

  componentDidMount() {
    this.getWallets();
  }

  componentDidUpdate(
    prevProps: IWalletWidgetContainerProps & IWalletWidgetContainerStateProps
  ) {
    if (prevProps.currency !== this.props.currency) {
      this.getWallets();
    }
  }

  render() {
    const { className, info } = this.props;
    if (!info) return null;
    const {
      currencyCcy,
      availableCcy,
      investedCcy,
      pendingCcy,
      totalCcy
    } = info;
    return (
      <WalletWidget
        condition={!!info}
        loader={<WalletWidgetLoader className={className} />}
        className={className}
        info={info!}
      />
    );
  }
}

const mapStateToProps = (
  state: RootState
): IWalletWidgetContainerStateProps => {
  return {
    currency: state.accountSettings.currency,
    info: state.wallet.info.data ? state.wallet.info.data.grandTotal : undefined
  };
};

export default connect(
  mapStateToProps,
  { fetchWallets }
)(WalletWidgetContainer);

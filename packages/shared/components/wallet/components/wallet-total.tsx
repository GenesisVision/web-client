import { WalletMultiSummary } from "gv-api-web";
import * as React from "react";
import { walletApi } from "shared/services/api-client/wallet-api";

import authService from "../../../services/auth-service";

interface IWalletProps {
  currency: string;
}

interface IWalletState {
  info?: WalletMultiSummary;
}

class WalletCurrency extends React.Component<IWalletProps, IWalletState> {
  componentDidMount() {
    const currency = this.props.currency;
    walletApi
      .v10WalletMultiByCurrencyGet(currency, authService.getAuthArg())
      .then(
        (info: WalletMultiSummary): any => {
          this.setState({ info });
        }
      );
  }

  render() {
    return this.state.info;
  }
}

export default WalletCurrency;

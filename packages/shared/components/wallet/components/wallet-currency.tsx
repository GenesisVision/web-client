import * as React from "react";

interface IWalletProps {
  currency: string;
}

interface IWalletState {
  info?: object;
}

class WalletCurrency extends React.Component<IWalletProps, IWalletState> {
  state = {
    info: null
  };
  componentDidMount() {
    const currency = this.props.currency;
  }

  render() {
    return this.state.info;
  }
}

export default WalletCurrency;

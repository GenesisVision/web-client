import { IState } from "manager-web-portal/src/reducers";
import * as React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";

import NotFoundPage from "../../not-found/not-found.routes";
import Page from "../../page/page";
import { INVESTOR_EVENT_TYPE_FILTER_VALUES } from "../../table/components/filtering/event-type-filter/event-type-filter.constants";
import WalletBalanceElements from "./wallet-balance/wallet-balance-elements";
import WalletBalanceLoader from "./wallet-balance/wallet-balance-loader";
import WalletContainerTotal from "./wallet-container/wallet-container-total";

interface IWalletProps {
  currency: string;
}

interface IWalletState {
  info?: object;
}

class WalletCurrency extends React.Component<IWalletProps, IWalletState> {
  render() {
    const { t, info, isPending } = this.props;
    if (!info && isPending) return <WalletBalanceLoader />;
    if (!info) return <NotFoundPage />;
    return (
      <Page title={info.title}>
        <h1>{info.title}</h1>
        <div className="wallet-balance">
          <WalletBalanceElements walletBalanceData={info} />
        </div>
      </Page>
    );
  }
}

const mapStateToProps = (state: IState, ownProps) => {
  const isPending = state.wallet.info.isPending;
  const info = state.wallet.info.data
    ? state.wallet.info.data.wallets.find(
        wallet => wallet.currency.toLowerCase() === ownProps.currency
      )
    : null;
  return {
    info,
    isPending
  };
};

export default compose(
  connect(mapStateToProps),
  translate()
)(WalletCurrency);

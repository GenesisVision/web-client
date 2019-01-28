import { WalletData } from "gv-api-web";
import { IState } from "manager-web-portal/src/reducers";
import * as React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import BTCIcon from "shared/media/currency/BTC.svg";
import ETHIcon from "shared/media/currency/ETH.svg";
import GVTIcon from "shared/media/currency/GVT.svg";

import NotFoundPage from "../../not-found/not-found.routes";
import Page from "../../page/page";
import { INVESTOR_EVENT_TYPE_FILTER_VALUES } from "../../table/components/filtering/event-type-filter/event-type-filter.constants";
import WalletBalanceElements from "./wallet-balance/wallet-balance-elements";
import WalletBalanceLoader from "./wallet-balance/wallet-balance-loader";
import WalletContainer from "./wallet-container/wallet-container";

const Icons = {
  GVT: GVTIcon,
  BTC: BTCIcon,
  ETH: ETHIcon
};

export const getWalletIcon = (currency: string): string => {
  return Icons[currency];
};

interface IWalletProps {
  currency: string;
  info?: WalletData;
  isPending: boolean;
  t(str: string): string;
}

class WalletCurrency extends React.Component<IWalletProps> {
  render() {
    const { info, isPending } = this.props;
    if (!info && isPending) return <WalletBalanceLoader />;
    if (!info) return <NotFoundPage />;
    return (
      <Page title={info.title}>
        <h1>
          {info.title}
          <img
            src={getWalletIcon(info.currency)}
            className="wallet-balance__header-icon"
            alt="Icon"
          />
        </h1>
        <div className="wallet-balance">
          <WalletBalanceElements walletBalanceData={info} />
        </div>
        <WalletContainer
          currency={this.props.currency}
          eventTypeFilterValues={INVESTOR_EVENT_TYPE_FILTER_VALUES}
        />
      </Page>
    );
  }
}

const mapStateToProps = (state: IState, ownProps) => {
  const isPending = state.wallet.info.isPending;
  const { currency } = ownProps.match.params;
  const info = state.wallet.info.data
    ? state.wallet.info.data.wallets.find(
        wallet => wallet.currency === currency.toUpperCase()
      )
    : null;
  return {
    info,
    isPending,
    currency: currency.toUpperCase()
  };
};

export default compose(
  connect(mapStateToProps),
  translate()
)(WalletCurrency);

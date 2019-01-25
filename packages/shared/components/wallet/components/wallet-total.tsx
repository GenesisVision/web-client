import { WalletsGrandTotal } from "gv-api-web";
import { IState } from "investor-web-portal/src/reducers";
import * as React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";

import Page from "../../page/page";
import { INVESTOR_EVENT_TYPE_FILTER_VALUES } from "../../table/components/filtering/event-type-filter/event-type-filter.constants";
import WalletBalanceElements from "./wallet-balance/wallet-balance-elements";
import WalletContainerTotal from "./wallet-container/wallet-container-total";

interface IWalletProps {
  currency: string;
  t(str: string): string;
}

interface IWalletState {
  info?: WalletsGrandTotal;
}

class WalletTotal extends React.Component<IWalletProps, IWalletState> {
  render() {
    const { t, info } = this.props;
    if (!this.props.info) return <p>...loading</p>;
    return (
      <Page title={t("wallet-page.title")}>
        <h1>{t("wallet-page.title")}</h1>
        <div className="wallet-balance">
          <WalletBalanceElements walletBalanceData={this.props.info} />
        </div>
        <WalletContainerTotal
          wallets={this.props.wallets}
          eventTypeFilterValues={INVESTOR_EVENT_TYPE_FILTER_VALUES}
        />
      </Page>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  info: state.wallet.info.data ? state.wallet.info.data.grandTotal : null,
  wallets: state.wallet.info.data ? state.wallet.info.data.wallets : []
});

export default compose(
  connect(mapStateToProps),
  translate()
)(WalletTotal);

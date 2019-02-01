import { WalletData, WalletsGrandTotal } from "gv-api-web";
import { RootState } from "investor-web-portal/src/reducers";
import * as React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";

import Page from "../../page/page";
import WalletBalanceElements from "./wallet-balance/wallet-balance-elements";
import WalletBalanceLoader from "./wallet-balance/wallet-balance-loader";
import WalletContainerTotal from "./wallet-container/wallet-container-total";

interface IWalletProps {
  currency: string;
  info?: WalletsGrandTotal;
  wallets: WalletData[];
  t(str: string): string;
}

class WalletTotal extends React.Component<IWalletProps, any> {
  render() {
    const { t, info, wallets } = this.props;
    if (!info) return <WalletBalanceLoader />;
    return (
      <Page title={t("wallet-page.title")}>
        <div className="wallet-balance">
          <h1>{t("wallet-page.title")}</h1>
          <WalletBalanceElements walletBalanceData={info} />
        </div>
        <WalletContainerTotal wallets={wallets} />
      </Page>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  info: state.wallet.info.data ? state.wallet.info.data.grandTotal : null,
  wallets: state.wallet.info.data ? state.wallet.info.data.wallets : []
});

export default compose(
  connect(mapStateToProps),
  translate()
)(WalletTotal);

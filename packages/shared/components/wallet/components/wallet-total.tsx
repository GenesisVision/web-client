import { MultiWalletFilters, WalletsGrandTotal, WalletsInfo } from "gv-api-web";
import * as React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import RootState from "shared/reducers/root-reducer";

import Page from "../../page/page";
import WalletBalanceElements from "./wallet-balance/wallet-balance-elements";
import WalletBalanceLoader from "./wallet-balance/wallet-balance-loader";
import WalletContainerTotal from "./wallet-container/wallet-container-total";

interface IWalletProps {
  t(str: string): string;
  info?: WalletsGrandTotal;
  filters?: MultiWalletFilters;
  wallets?: WalletsInfo;
}

class WalletTotal extends React.Component<IWalletProps> {
  render() {
    const { t, info, wallets, filters, currencies } = this.props;
    if (!info) return <WalletBalanceLoader />;
    return (
      <Page title={t("wallet-page.title")}>
        <div className="wallet-balance">
          <h1>{t("wallet-page.title")}</h1>
          <WalletBalanceElements walletBalanceData={info} />
        </div>
        <WalletContainerTotal
          wallets={wallets}
          filters={filters}
          currencies={currencies}
        />
      </Page>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  info: state.wallet.info.data ? state.wallet.info.data.grandTotal : null,
  wallets: state.wallet.info.data ? state.wallet.info.data.wallets : [],
  filters: state.wallet.filters.data ? state.wallet.filters.data : null,
  currencies: state.platformData.data
    ? state.platformData.data.currencies
    : null
});

export default compose(
  connect(mapStateToProps),
  translate()
)(WalletTotal);

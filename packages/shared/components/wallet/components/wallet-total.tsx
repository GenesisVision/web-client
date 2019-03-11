import { MultiWalletFilters, WalletsGrandTotal, WalletsInfo } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { ROLE } from "shared/constants/constants";
import RootState from "shared/reducers/root-reducer";

import Page from "../../page/page";
import WalletBalanceElements from "./wallet-balance/wallet-balance-elements";
import WalletBalanceLoader from "./wallet-balance/wallet-balance-loader";
import WalletContainerTotal from "./wallet-container/wallet-container-total";
import WalletSettingsContainer from "./wallet-settings/wallet-settings-container";

type StateProps = {
  info?: WalletsGrandTotal;
  filters?: MultiWalletFilters;
  isPayFeesWithGvt?: boolean;
  wallets?: WalletsInfo;
  role?: ROLE;
};

type Props = StateProps & WithTranslation;

class WalletTotal extends React.Component<Props> {
  render() {
    const { t, info, wallets, filters, role, isPayFeesWithGvt } = this.props;
    if (!info) return <WalletBalanceLoader />;
    return (
      <Page title={t("wallet-page.title")}>
        <div className="wallet-balance">
          <div className="wallet-balance__wrapper">
            <h1 className="wallet-balance__title">{t("wallet-page.title")}</h1>
            <WalletSettingsContainer isPayFeesWithGvt={isPayFeesWithGvt} />
          </div>
          <WalletBalanceElements
            available={info.availableCcy}
            pending={info.pendingCcy}
            total={info.totalCcy}
            invested={info.investedCcy}
            currency={info.currencyCcy}
          />
        </div>
        <WalletContainerTotal
          wallets={wallets}
          filters={filters}
          copytrading={role === ROLE.INVESTOR}
        />
      </Page>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  role: state.profileHeader.info.data
    ? state.profileHeader.info.data.userType
    : null,
  info: state.wallet.info.data ? state.wallet.info.data.grandTotal : null,
  wallets: state.wallet.info.data ? state.wallet.info.data.wallets : [],
  isPayFeesWithGvt: state.wallet.info.data
    ? state.wallet.info.data.payFeesWithGvt
    : null,
  filters: state.platformData.data
    ? state.platformData.data.enums.multiWallet
    : []
});

export default compose(
  connect(mapStateToProps),
  withTranslation()
)(WalletTotal);

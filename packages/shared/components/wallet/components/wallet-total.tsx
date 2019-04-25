import {
  CopyTradingAccountInfo,
  MultiWalletFilters,
  WalletData,
  WalletsGrandTotal
} from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import Page from "shared/components/page/page";
import { ROLE, ROLE_ENV } from "shared/constants/constants";
import RootState from "shared/reducers/root-reducer";

import { WalletRouteProps } from "../wallet.routes";
import WalletBalanceElements from "./wallet-balance/wallet-balance-elements";
import WalletBalanceLoader from "./wallet-balance/wallet-balance-loader";
import WalletContainerTotal from "./wallet-container/wallet-container-total";
import WalletSettingsContainer from "./wallet-settings/wallet-settings-container";

class WalletTotal extends React.PureComponent<Props & WalletRouteProps> {
  render() {
    const {
      t,
      info,
      wallets,
      filters,
      isPayFeesWithGvt,
      copyTradingAccounts
    } = this.props;
    if (!info || !filters) return <WalletBalanceLoader />;
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
          copyTradingAccounts={copyTradingAccounts}
          wallets={wallets}
          filters={filters}
          copytrading={ROLE_ENV === ROLE.INVESTOR}
        />
      </Page>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  info: state.wallet.info.data ? state.wallet.info.data.grandTotal : null,
  wallets: state.wallet.info.data ? state.wallet.info.data.wallets : [],
  copyTradingAccounts: state.copyTradingAccounts.info.data
    ? state.copyTradingAccounts.info.data.accounts
    : [],
  isPayFeesWithGvt: state.wallet.info.data
    ? state.wallet.info.data.payFeesWithGvt
    : null,
  filters: state.platformData.data
    ? state.platformData.data.enums.multiWallet
    : undefined
});

interface Props extends StateProps, InjectedTranslateProps {}

interface StateProps {
  wallets: WalletData[];
  copyTradingAccounts: CopyTradingAccountInfo[];
  info?: WalletsGrandTotal;
  filters?: MultiWalletFilters;
  isPayFeesWithGvt?: boolean;
}

export default compose<React.FunctionComponent<WalletRouteProps>>(
  connect(mapStateToProps),
  translate()
)(WalletTotal);

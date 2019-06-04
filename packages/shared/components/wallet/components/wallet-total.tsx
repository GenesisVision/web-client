import {
  CopyTradingAccountsList,
  MultiWalletFilters,
  WalletData,
  WalletsGrandTotal
} from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import Page from "shared/components/page/page";
import { ROLE } from "shared/constants/constants";
import withRole, { WithRoleProps } from "shared/decorators/withRole";
import { IApiState } from "shared/reducers/api-reducer/api-reducer";
import RootState from "shared/reducers/root-reducer";

import { WalletRouteProps } from "../wallet.routes";
import WalletBalanceElements from "./wallet-balance/wallet-balance-elements";
import WalletBalanceLoader from "./wallet-balance/wallet-balance-loader";
import WalletSettingsLoader from "./wallet-balance/wallet-settings-loader";
import WalletContainerTotal from "./wallet-container/wallet-container-total";
import WalletSettingsContainer from "./wallet-settings/wallet-settings-container";

class WalletTotal extends React.PureComponent<Props & WalletRouteProps> {
  render() {
    const {
      role,
      t,
      info,
      wallets,
      filters,
      isPayFeesWithGvt,
      copyTradingAccounts
    } = this.props;
    return (
      <Page title={t("wallet-page.title")}>
        <div className="wallet-balance">
          <div className="wallet-balance__wrapper">
            <h1 className="wallet-balance__title">{t("wallet-page.title")}</h1>
            {isPayFeesWithGvt === undefined ? (
              <WalletSettingsLoader />
            ) : (
              <WalletSettingsContainer isPayFeesWithGvt={isPayFeesWithGvt} />
            )}
          </div>
          {!info || !filters ? (
            <WalletBalanceLoader />
          ) : (
            <>
              <WalletBalanceElements
                available={info.availableCcy}
                pending={info.pendingCcy}
                total={info.totalCcy}
                invested={info.investedCcy}
                currency={info.currencyCcy}
              />
              <WalletContainerTotal
                isPending={copyTradingAccounts.isPending}
                copyTradingAccounts={
                  copyTradingAccounts.data
                    ? copyTradingAccounts.data.accounts
                    : []
                }
                wallets={wallets}
                filters={filters}
                copytrading={role === ROLE.INVESTOR}
              />
            </>
          )}
        </div>
      </Page>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  info: state.wallet.info.data ? state.wallet.info.data.grandTotal : null,
  wallets: state.wallet.info.data ? state.wallet.info.data.wallets : [],
  copyTradingAccounts: state.copyTradingAccounts.info,
  isPayFeesWithGvt: state.wallet.info.data
    ? state.wallet.info.data.payFeesWithGvt
    : undefined,
  filters: state.platformData.data
    ? state.platformData.data.enums.multiWallet
    : undefined
});

interface Props extends StateProps, InjectedTranslateProps, WithRoleProps {}

interface StateProps {
  wallets: WalletData[];
  copyTradingAccounts: IApiState<CopyTradingAccountsList>;
  info?: WalletsGrandTotal;
  filters?: MultiWalletFilters;
  isPayFeesWithGvt?: boolean;
}

export default compose<React.ComponentType<WalletRouteProps>>(
  withRole,
  connect(mapStateToProps),
  translate()
)(WalletTotal);

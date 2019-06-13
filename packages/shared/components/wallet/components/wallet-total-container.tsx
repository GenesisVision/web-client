import { CopyTradingAccountInfo, WalletMultiSummary } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { WithRoleProps } from "shared/decorators/with-role";
import { RootState } from "shared/reducers/root-reducer";

import {
  copyTradingAccountsSelector,
  walletSelector
} from "../reducers/wallet.reducers";
import { WalletRouteProps } from "../wallet.routes";
import WalletBalanceLoader from "./wallet-balance/wallet-balance-loader";
import WalletTotal from "./wallet-total";

const _WalletTotalContainer: React.FC<Props & WalletRouteProps> = ({
  wallet,
  t,
  copyTradingAccounts
}) => (
  <WalletTotal
    condition={!!wallet}
    loader={<WalletBalanceLoader />}
    wallet={wallet!}
    copyTradingAccounts={copyTradingAccounts}
  />
);

const mapStateToProps = (state: RootState): StateProps => ({
  wallet: walletSelector(state),
  copyTradingAccounts: copyTradingAccountsSelector(state)
});

interface Props extends StateProps, InjectedTranslateProps, WithRoleProps {}

interface StateProps {
  copyTradingAccounts: CopyTradingAccountInfo[];
  wallet?: WalletMultiSummary;
}

const WalletTotalContainer = compose<React.ComponentType<WalletRouteProps>>(
  connect(mapStateToProps),
  translate(),
  React.memo
)(_WalletTotalContainer);
export default WalletTotalContainer;

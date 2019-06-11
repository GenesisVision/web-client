import { CopyTradingAccountsList, WalletMultiSummary } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { WithRoleProps } from "shared/decorators/with-role";
import { IApiState } from "shared/reducers/reducer-creators/api-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { apiSelector } from "shared/utils/selector";

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

const walletsSelector = apiSelector<WalletMultiSummary>(
  state => state.wallet.info
);
const mapStateToProps = (state: RootState): StateProps => ({
  wallet: walletsSelector(state),
  copyTradingAccounts: state.copyTradingAccounts.info
});

interface Props extends StateProps, InjectedTranslateProps, WithRoleProps {}

interface StateProps {
  copyTradingAccounts: IApiState<CopyTradingAccountsList>;
  wallet?: WalletMultiSummary;
}

const WalletTotalContainer = compose<React.ComponentType<WalletRouteProps>>(
  connect(mapStateToProps),
  translate(),
  React.memo
)(_WalletTotalContainer);
export default WalletTotalContainer;

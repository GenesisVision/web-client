import { CopyTradingAccountInfo } from "gv-api-web";
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createSelector } from "reselect";
import WalletLoader from "shared/components/wallet/components/wallet-loader";
import { copyTradingAccountsSelector } from "shared/components/wallet/reducers/wallet.reducers";
import { RootState } from "shared/reducers/root-reducer";

import WalletCopytradingAccount from "./wallet-copytrading-account";

const _WalletCopytradingAccountContainer: React.FC<Props> = ({
  copyTradingAccount
}) => (
  <WalletCopytradingAccount
    account={copyTradingAccount!}
    condition={!!copyTradingAccount}
    loader={<WalletLoader />}
  />
);

interface StateProps {
  copyTradingAccount?: CopyTradingAccountInfo;
  copyTradingAccounts: CopyTradingAccountInfo[];
}

interface OwnProps {
  currency: string;
}

interface Props extends OwnProps, StateProps {}

const copyTradingAccountSelector = createSelector<
  RootState,
  OwnProps,
  CopyTradingAccountInfo[] | undefined,
  string,
  CopyTradingAccountInfo | undefined
>(
  (state: RootState) => copyTradingAccountsSelector(state),
  (state: RootState, props: OwnProps) => props.currency,
  (data: CopyTradingAccountInfo[] | undefined, currency: string) => {
    if (!data) return undefined;
    return data.find(
      (account: CopyTradingAccountInfo) =>
        account.currency === currency.toUpperCase()
    );
  }
);

const mapStateToProps = (state: RootState, props: Props): StateProps => ({
  copyTradingAccount: copyTradingAccountSelector(state, props),
  copyTradingAccounts: copyTradingAccountsSelector(state)
});

const WalletCopytradingAccountContainer = compose<
  React.ComponentType<OwnProps>
>(
  connect(mapStateToProps),
  React.memo
)(_WalletCopytradingAccountContainer);

export default WalletCopytradingAccountContainer;

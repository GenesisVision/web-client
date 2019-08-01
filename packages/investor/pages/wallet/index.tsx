import React from "react";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import platformActions from "shared/actions/platform-actions";
import WalletTotalContainer from "shared/components/wallet/components/wallet-total-container";
import {
  fetchAccounts,
  fetchWallets
} from "shared/components/wallet/services/wallet.services";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { NextPageWithRedux } from "shared/utils/types";

const Wallet: NextPageWithRedux<Props, {}> = () => {
  return <WalletTotalContainer />;
};

Wallet.getInitialProps = async ctx => {
  await Promise.all([
    ctx.reduxStore.dispatch(
      async dispatch => await dispatch(platformActions.fetchPlatformSettings())
    ),
    ctx.reduxStore.dispatch(fetchWallets(ctx)),
    ctx.reduxStore.dispatch(fetchAccounts(ctx))
  ]);
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { fetchWallets, fetchAccounts },
    dispatch
  )
});

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withDefaultLayout,
  withPrivateRoute
)(Wallet);

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}
interface ServiceThunks extends ActionCreatorsMapObject {
  fetchWallets: typeof fetchWallets;
  fetchAccounts: typeof fetchAccounts;
}

interface Props extends DispatchProps {}

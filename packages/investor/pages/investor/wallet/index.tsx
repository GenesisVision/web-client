import React from "react";
import { compose } from "redux";
import platformActions from "shared/actions/platform-actions";
import WalletTotalContainer from "shared/components/wallet/components/wallet-total-container";
import {
  fetchAccounts,
  fetchWalletsWithCtx
} from "shared/components/wallet/services/wallet.services";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { NextPageWithRedux } from "shared/utils/types";

const Wallet: NextPageWithRedux<void> = () => {
  return <WalletTotalContainer />;
};

Wallet.getInitialProps = async ctx => {
  await Promise.all([
    ctx.reduxStore.dispatch(
      async dispatch => await dispatch(platformActions.fetchPlatformSettings())
    ),
    ctx.reduxStore.dispatch(fetchWalletsWithCtx(ctx)),
    ctx.reduxStore.dispatch(fetchAccounts(ctx))
  ]);
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(Wallet);

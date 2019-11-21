import platformActions from "actions/platform-actions";
import WalletTotalContainer from "components/wallet/components/wallet-total-container";
import {
  fetchAccounts,
  fetchWalletsWithCtx
} from "components/wallet/services/wallet.services";
import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<void> = () => {
  return <WalletTotalContainer />;
};

Page.getInitialProps = async ctx => {
  await Promise.all([
    ctx.reduxStore.dispatch(
      async dispatch => await dispatch(platformActions.fetchPlatformSettings())
    ),
    ctx.reduxStore.dispatch(fetchWalletsWithCtx(ctx)),
    ctx.reduxStore.dispatch(fetchAccounts(ctx))
  ]);
};

export const Wallets = compose(
  withDefaultLayout,
  withPrivateRoute
)(Page);

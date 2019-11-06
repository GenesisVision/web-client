import AttachAccountPage from "pages/attach-account/attach-account.page";
import { fetchMinimumDepositAmount } from "pages/create-fund/services/create-fund.service";
import React from "react";
import { compose } from "redux";
import platformActions from "shared/actions/platform-actions";
import { fetchWalletsWithCtx } from "shared/components/wallet/services/wallet.services";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { NextPageWithRedux } from "shared/utils/types";

const Page: NextPageWithRedux<Props, {}> = ({}) => {
  return <AttachAccountPage />;
};

Page.getInitialProps = async ctx => {
  let minimumDepositAmount;
  await Promise.all([
    ctx.reduxStore.dispatch(
      async dispatch => await dispatch(platformActions.fetchPlatformSettings())
    ),
    ctx.reduxStore.dispatch(fetchWalletsWithCtx(ctx)),
    fetchMinimumDepositAmount(ctx).then(res => (minimumDepositAmount = res))
  ]);
  return { minimumDepositAmount };
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(Page);

interface Props {
  minimumDepositAmount: number;
}

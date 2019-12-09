import platformActions from "actions/platform-actions";
import { fetchWalletsWithCtx } from "components/wallet/services/wallet.services";
import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import CreateFundPage from "pages/create-fund/create-fund.page";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

const CreateFund: NextPageWithRedux<Props, {}> = ({}) => {
  return <CreateFundPage />;
};

CreateFund.getInitialProps = async ctx => {
  await Promise.all([
    ctx.reduxStore.dispatch(
      async dispatch => await dispatch(platformActions.fetchPlatformSettings())
    ),
    ctx.reduxStore.dispatch(fetchWalletsWithCtx(ctx))
  ]);
  return {};
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(CreateFund);

interface Props {}

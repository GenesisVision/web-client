import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import CreateFundPage from "pages/create-fund/create-fund.page";
import { fetchWalletsWithCtx } from "pages/wallet/services/wallet.services";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

const CreateFund: NextPageWithRedux<Props, {}> = () => {
  return <CreateFundPage />;
};

CreateFund.getInitialProps = async ctx => {
  await ctx.reduxStore.dispatch(fetchWalletsWithCtx(ctx));
  return { namespacesRequired: ["asset-settings", "create-fund-page"] };
};

export default compose(withDefaultLayout, withPrivateRoute)(CreateFund);

interface Props {}

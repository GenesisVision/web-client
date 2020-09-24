import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import CreateSelfManagedFundPage from "pages/create-fund/create-self-managed-fund.page";
import { fetchWalletsWithCtx } from "pages/wallet/services/wallet.services";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

interface Props {}

const CreateFund: NextPageWithRedux<Props, {}> = () => {
  return <CreateSelfManagedFundPage />;
};

CreateFund.getInitialProps = async ctx => {
  await ctx.reduxStore.dispatch(fetchWalletsWithCtx(ctx));
  return {
    namespacesRequired: [
      "form-fields",
      "asset-settings",
      "create-account",
      "create-fund-page"
    ]
  };
};

export default compose(withDefaultLayout, withPrivateRoute)(CreateFund);

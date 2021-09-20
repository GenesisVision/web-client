import withDefaultLayout from "decorators/with-default-layout";
import { getFiltersFromContext } from "modules/programs-table/services/programs-table.service";
import React from "react";
import { NextPageWithRedux } from "utils/types";
import AssetsPage from "pages/invest/assets/assets.page";
import { fetchAssetsCoinsAction } from "pages/invest/assets/actions/assets.actions";

const Page: NextPageWithRedux<{}> = () => {
  return <AssetsPage />;
};

Page.getInitialProps = async () => ({
  namespacesRequired: [
    "assets-page"
  ]
});

Page.getInitialProps = async ctx => {
  const filtering = getFiltersFromContext(ctx);
  await Promise.all([
    ctx.reduxStore.dispatch(dispatch =>
      dispatch(fetchAssetsCoinsAction(filtering))
    )
  ]);
  return {
    namespacesRequired: ["assets-page"]
  };
};

export default withDefaultLayout(Page);

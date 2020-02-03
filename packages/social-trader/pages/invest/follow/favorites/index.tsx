import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { fetchFollowsAction } from "modules/follows-table/actions/follows-table.actions";
import { getFiltersFromContext } from "modules/programs-table/services/programs-table.service";
import FollowsPage from "pages/invest/follows/follows.page";
import React from "react";
import { compose } from "redux";
import authService from "services/auth-service";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<void> = () => {
  return <FollowsPage />;
};

Page.getInitialProps = async ctx => {
  const filtering = getFiltersFromContext(ctx);
  await ctx.reduxStore.dispatch(
    // @ts-ignore TODO why there is error
    fetchFollowsAction({
      ...filtering,
      authorization: authService.getAuthArg(ctx),
      isFavorite: true
    })
  );
};

export default compose(withPrivateRoute, withDefaultLayout)(Page);

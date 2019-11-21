import FollowsPage from "components/follows/follows.page";
import withDefaultLayout from "decorators/with-default-layout";
import { fetchFollowsAction } from "modules/follows-table/actions/follows-table.actions";
import { getFiltersFromContext } from "modules/programs-table/services/programs-table.service";
import React from "react";
import authService from "shared/services/auth-service";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<any> = () => {
  return <FollowsPage />;
};

Page.getInitialProps = async ctx => {
  const filtering = getFiltersFromContext(ctx);
  try {
    await ctx.reduxStore.dispatch(
      fetchFollowsAction({
        ...filtering,
        authorization: authService.getAuthArg(ctx)
      })
    );
  } catch (e) {}
};

export default withDefaultLayout(Page);

import React from "react";
import FollowsPage from "shared/components/follows/follows.page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import { fetchFollowsAction } from "shared/modules/follows-table/actions/follows-table.actions";
import { getFiltersFromContext } from "shared/modules/programs-table/services/programs-table.service";
import authService from "shared/services/auth-service";
import { NextPageWithRedux } from "shared/utils/types";

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

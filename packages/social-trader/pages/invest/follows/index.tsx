import React from "react";
import FollowsPage from "shared/components/follows/follows.page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import { fetchFollowsAction } from "shared/modules/follows-table/actions/follows-table.actions";
import { getFiltersFromContext } from "shared/modules/programs-table/services/programs-table.service";
import authService from "shared/services/auth-service";
import { NextPageWithRedux } from "shared/utils/types";

const Page: NextPageWithRedux<{}> = () => {
  return <FollowsPage />;
};

Page.getInitialProps = async ctx => {
  const filtering = getFiltersFromContext(ctx);
  await ctx.reduxStore.dispatch(
    // @ts-ignore TODO why there is error
    fetchFollowsAction({
      ...filtering,
      authorization: authService.getAuthArg(ctx)
    })
  );
  return {};
};

export default withDefaultLayout(Page);

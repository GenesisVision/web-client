import withDefaultLayout from "decorators/with-default-layout";
import {
  fetchFollowsAction,
  FetchSignalAssetsFilterType
} from "modules/follows-table/actions/follows-table.actions";
import { getFiltersFromContext } from "modules/programs-table/services/programs-table.service";
import FollowsPage from "pages/invest/follows/follows.page";
import React from "react";
import authService from "services/auth-service";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<any> = () => {
  return <FollowsPage />;
};

Page.getInitialProps = async ctx => {
  const filtering = getFiltersFromContext(ctx) as FetchSignalAssetsFilterType;
  try {
    await Promise.all([
      ctx.reduxStore.dispatch(
        fetchFollowsAction({
          ...filtering,
          authorization: authService.getAuthArg(ctx)
        })
      )
    ]);
  } catch (e) {}
};

export default withDefaultLayout(Page);

import { updateGlobalTableViewAction } from "actions/tables-view-actions";
import { LIST_VIEW } from "components/table/table.constants";
import withDefaultLayout from "decorators/with-default-layout";
import {
  fetchFollowsAction,
  FetchSignalAssetsFilterType
} from "modules/follows-table/actions/follows-table.actions";
import { getFiltersFromContext } from "modules/programs-table/services/programs-table.service";
import FollowsPage from "pages/invest/follows/follows.page";
import React from "react";
import { GLOBAL_TABLE_VIEW } from "reducers/tables-view-reducer";
import authService from "services/auth-service";
import { getCookie } from "utils/cookie";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<any> = () => {
  return <FollowsPage />;
};

Page.getInitialProps = async ctx => {
  const filtering = getFiltersFromContext(ctx) as FetchSignalAssetsFilterType;
  const tableView =
    (getCookie(GLOBAL_TABLE_VIEW, ctx) as LIST_VIEW) || LIST_VIEW.CARDS;
  try {
    await Promise.all([
      ctx.reduxStore.dispatch(
        fetchFollowsAction({
          ...filtering,
          authorization: authService.getAuthArg(ctx)
        })
      ),
      ctx.reduxStore.dispatch(updateGlobalTableViewAction(tableView))
    ]);
  } catch (e) {}
};

export default withDefaultLayout(Page);

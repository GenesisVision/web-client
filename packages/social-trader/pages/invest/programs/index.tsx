import { updateGlobalTableViewAction } from "actions/tables-view-actions";
import { LIST_VIEW } from "components/table/table.constants";
import withDefaultLayout from "decorators/with-default-layout";
import * as programTableActions from "modules/programs-table/actions/programs-table.actions";
import { getFiltersFromContext } from "modules/programs-table/services/programs-table.service";
import ProgramsPage from "pages/invest/programs/programs.page";
import React from "react";
import { GLOBAL_TABLE_VIEW } from "reducers/tables-view-reducer";
import authService from "services/auth-service";
import { getCookie } from "utils/cookie";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<{}> = () => {
  return <ProgramsPage />;
};

Page.getInitialProps = async ctx => {
  const filtering = getFiltersFromContext(ctx);
  const tableView =
    (getCookie(GLOBAL_TABLE_VIEW, ctx) as LIST_VIEW) || LIST_VIEW.CARDS;
  try {
    await Promise.all([
      ctx.reduxStore.dispatch(
        // @ts-ignore TODO why there is error
        programTableActions.fetchProgramsAction({
          ...filtering,
          authorization: authService.getAuthArg(ctx)
        })
      ),
      ctx.reduxStore.dispatch(updateGlobalTableViewAction(tableView))
    ]);
  } catch (e) {}

  return {};
};

export default withDefaultLayout(Page);

import { updateGlobalTableViewAction } from "actions/tables-view-actions";
import { LIST_VIEW } from "components/table/table.constants";
import withDefaultLayout from "decorators/with-default-layout";
import { fetchFundsAction } from "modules/funds-table/actions/funds-table.actions";
import { getFiltersFromContext } from "modules/funds-table/services/funds-table.service";
import FundsPage from "pages/invest/funds/funds.page";
import React from "react";
import { GLOBAL_TABLE_VIEW } from "reducers/tables-view-reducer";
import { getCookie } from "utils/cookie";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<{}, {}> = () => {
  return <FundsPage />;
};

Page.getInitialProps = async ctx => {
  const filters = getFiltersFromContext(ctx);
  const tableView =
    (getCookie(GLOBAL_TABLE_VIEW, ctx) as LIST_VIEW) || LIST_VIEW.CARDS;
  try {
    await Promise.all([
      ctx.reduxStore.dispatch(fetchFundsAction(filters, ctx.token)),
      ctx.reduxStore.dispatch(updateGlobalTableViewAction(tableView))
    ]);
  } catch (e) {}

  return {};
};

export default withDefaultLayout(Page);

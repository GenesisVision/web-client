import withDefaultLayout from "decorators/with-default-layout";
import { fetchFundsAction } from "modules/funds-table/actions/funds-table.actions";
import { getFiltersFromContext } from "modules/funds-table/services/funds-table.service";
import FundsPage from "pages/invest/funds/funds.page";
import React from "react";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<{}, {}> = () => {
  return <FundsPage />;
};

Page.getInitialProps = async ctx => {
  const filters = getFiltersFromContext(ctx);
  try {
    await Promise.all([
      ctx.reduxStore.dispatch(fetchFundsAction(filters, ctx.token))
    ]);
  } catch (e) {}

  return {};
};

export default withDefaultLayout(Page);

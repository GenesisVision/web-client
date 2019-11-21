import FundsPage from "components/funds/funds.page";
import withDefaultLayout from "decorators/with-default-layout";
import { fetchFundsAction } from "modules/funds-table/actions/funds-table.actions";
import { getFiltersFromContext } from "modules/funds-table/services/funds-table.service";
import React from "react";
import authService from "shared/services/auth-service";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<{}, {}> = () => {
  return <FundsPage />;
};

Page.getInitialProps = async ctx => {
  const filters = getFiltersFromContext(ctx);
  await ctx.reduxStore.dispatch(
    //@ts-ignore
    fetchFundsAction({ ...filters, authorization: authService.getAuthArg(ctx) })
  );
  return {};
};

export const Funds = withDefaultLayout(Page);

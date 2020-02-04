import FundsPage from "components/funds/funds.page";
import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { fetchFundsAction } from "modules/funds-table/actions/funds-table.actions";
import { getFiltersFromContext } from "modules/funds-table/services/funds-table.service";
import React from "react";
import { compose } from "redux";
import authService from "services/auth-service";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux = () => {
  return <FundsPage />;
};

Page.getInitialProps = async ctx => {
  const filters = getFiltersFromContext(ctx);
  await ctx.reduxStore.dispatch(
    //@ts-ignore
    fetchFundsAction({
      ...filters,
      authorization: authService.getAuthArg(ctx),
      isFavorite: true
    })
  );
};

export const FundsFavorites = compose(
  withPrivateRoute,
  withDefaultLayout
)(Page);

import React from "react";
import { compose } from "redux";
import FundsPage from "shared/components/funds/funds.page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { fetchFundsAction } from "shared/modules/funds-table/actions/funds-table.actions";
import { getFiltersFromContext } from "shared/modules/funds-table/components/funds-table/funds-table-ssr";
import authService from "shared/services/auth-service";
import { NextPageWithRedux } from "shared/utils/types";

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

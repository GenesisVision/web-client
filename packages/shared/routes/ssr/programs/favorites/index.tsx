import React from "react";
import { compose } from "redux";
import ProgramsPage from "shared/components/programs/programs.page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import * as programTableActions from "shared/modules/programs-table/actions/programs-table.actions";
import { getFiltersFromContext } from "shared/modules/programs-table/components/programs-table/programs-table-ssr";
import authService from "shared/services/auth-service";
import { NextPageWithRedux } from "shared/utils/types";

const Page: NextPageWithRedux<void> = () => {
  return <ProgramsPage />;
};

Page.getInitialProps = async ctx => {
  const filtering = getFiltersFromContext(ctx);
  await ctx.reduxStore.dispatch(
    // @ts-ignore TODO why there is error
    programTableActions.fetchProgramsAction({
      ...filtering,
      authorization: authService.getAuthArg(ctx),
      isFavorite: true
    })
  );
};

export const ProgramFavorites = compose(
  withPrivateRoute,
  withDefaultLayout
)(Page);

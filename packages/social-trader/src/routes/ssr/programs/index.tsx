import ProgramsPage from "components/programs/programs.page";
import withDefaultLayout from "decorators/with-default-layout";
import * as programTableActions from "modules/programs-table/actions/programs-table.actions";
import { getFiltersFromContext } from "modules/programs-table/services/programs-table.service";
import React from "react";
import authService from "shared/services/auth-service";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<{}> = () => {
  return <ProgramsPage />;
};

Page.getInitialProps = async ctx => {
  const filtering = getFiltersFromContext(ctx);
  await ctx.reduxStore.dispatch(
    // @ts-ignore TODO why there is error
    programTableActions.fetchProgramsAction({
      ...filtering,
      authorization: authService.getAuthArg(ctx)
    })
  );
  return {};
};

export const Programs = withDefaultLayout(Page);

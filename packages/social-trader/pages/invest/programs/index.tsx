import withDefaultLayout from "decorators/with-default-layout";
import * as programTableActions from "modules/programs-table/actions/programs-table.actions";
import { getFiltersFromContext } from "modules/programs-table/services/programs-table.service";
import ProgramsPage from "pages/invest/programs/programs.page";
import React from "react";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<{}> = () => {
  return <ProgramsPage />;
};

Page.getInitialProps = async ctx => {
  const filtering = getFiltersFromContext(ctx);
  try {
    await Promise.all([
      ctx.reduxStore.dispatch(
        programTableActions.fetchProgramsAction(filtering, ctx.token)
      )
    ]);
  } catch (e) {
    console.error(e);
  }

  return {};
};

export default withDefaultLayout(Page);

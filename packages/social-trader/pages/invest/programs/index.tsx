import { LIST_VIEW } from "components/table/table.constants";
import withDefaultLayout from "decorators/with-default-layout";
import * as programTableActions from "modules/programs-table/actions/programs-table.actions";
import { getFiltersFromContext } from "modules/programs-table/services/programs-table.service";
import ProgramsPage from "pages/invest/programs/programs.page";
import React from "react";
import { getTableView } from "utils/table-view";
import { NextPageWithRedux } from "utils/types";

interface Props {
  outerView?: LIST_VIEW;
}

const Page: NextPageWithRedux<Props> = ({ outerView }) => {
  return <ProgramsPage outerView={outerView} />;
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
  const outerView = getTableView(ctx);
  return { outerView };
};

export default withDefaultLayout(Page);

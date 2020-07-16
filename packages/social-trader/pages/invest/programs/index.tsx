import { LIST_VIEW } from "components/table/table.constants";
import withDefaultLayout from "decorators/with-default-layout";
import { ProgramDetailsListItemItemsViewModel } from "gv-api-web";
import {
  fetchPrograms,
  getFiltersFromContext
} from "modules/programs-table/services/programs-table.service";
import ProgramsPage from "pages/invest/programs/programs.page";
import React from "react";
import { getTableView } from "utils/table-view";
import { NextPageWithToken } from "utils/types";

interface Props {
  data: ProgramDetailsListItemItemsViewModel;
  outerView?: LIST_VIEW;
}

const Page: NextPageWithToken<Props> = ({ data, outerView }) => {
  return <ProgramsPage data={data} outerView={outerView} />;
};

Page.getInitialProps = async ctx => {
  const filtering = getFiltersFromContext(ctx);
  let data;
  try {
    data = await fetchPrograms(filtering, ctx.token);
  } catch (e) {
    data = { items: [], total: 0 };
    console.error(e);
  }
  const outerView = getTableView(ctx);
  return {
    namespacesRequired: ["programs-page", "asset-list"],
    outerView,
    data
  };
};

export default withDefaultLayout(Page);

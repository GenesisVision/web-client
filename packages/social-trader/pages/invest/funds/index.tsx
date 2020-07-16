import { LIST_VIEW } from "components/table/table.constants";
import withDefaultLayout from "decorators/with-default-layout";
import { FundDetailsListItemItemsViewModel } from "gv-api-web";
import {
  fetchFunds,
  getFiltersFromContext
} from "modules/funds-table/services/funds-table.service";
import FundsPage from "pages/invest/funds/funds.page";
import React from "react";
import { getTableView } from "utils/table-view";
import { NextPageWithRedux } from "utils/types";

interface Props {
  data: FundDetailsListItemItemsViewModel;
  outerView?: LIST_VIEW;
}

const Page: NextPageWithRedux<Props> = ({ data, outerView }) => {
  return <FundsPage data={data} outerView={outerView} />;
};

Page.getInitialProps = async ctx => {
  const filtering = getFiltersFromContext(ctx);
  let data;
  try {
    data = await fetchFunds(filtering, ctx.token);
  } catch (e) {
    data = { items: [], total: 0 };
    console.error(e);
  }
  const outerView = getTableView(ctx);
  return {
    namespacesRequired: ["funds-page", "asset-list"],
    outerView,
    data
  };
};

export default withDefaultLayout(Page);

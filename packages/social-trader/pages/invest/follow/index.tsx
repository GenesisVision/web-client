import { LIST_VIEW } from "components/table/table.constants";
import withDefaultLayout from "decorators/with-default-layout";
import { FollowDetailsListItemItemsViewModel } from "gv-api-web";
import { fetchFollows } from "modules/follows-table/services/follows-table.service";
import { getFiltersFromContext } from "modules/programs-table/services/programs-table.service";
import FollowsPage from "pages/invest/follows/follows.page";
import React from "react";
import { getTableView } from "utils/table-view";
import { NextPageWithRedux } from "utils/types";

interface Props {
  data: FollowDetailsListItemItemsViewModel;
  outerView?: LIST_VIEW;
}

const Page: NextPageWithRedux<Props> = ({ data, outerView }) => {
  return <FollowsPage data={data} outerView={outerView} />;
};

Page.getInitialProps = async ctx => {
  const filtering = getFiltersFromContext(ctx);
  let data;
  try {
    data = await fetchFollows(filtering, ctx.token);
  } catch (e) {
    data = { items: [], total: 0 };
    console.error(e);
  }
  const outerView = getTableView(ctx);
  return {
    namespacesRequired: ["follows-page", "asset-list"],
    outerView,
    data
  };
};

export default withDefaultLayout(Page);

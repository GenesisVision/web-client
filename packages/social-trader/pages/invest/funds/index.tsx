import { LIST_VIEW } from "components/table/table.constants";
import withDefaultLayout from "decorators/with-default-layout";
import { fetchFundsAction } from "modules/funds-table/actions/funds-table.actions";
import { getFiltersFromContext } from "modules/funds-table/services/funds-table.service";
import FundsPage from "pages/invest/funds/funds.page";
import React from "react";
import { getTableView } from "utils/table-view";
import { NextPageWithRedux } from "utils/types";

interface Props {
  outerView?: LIST_VIEW;
}

const Page: NextPageWithRedux<Props> = ({ outerView }) => {
  return <FundsPage outerView={outerView} />;
};

Page.getInitialProps = async ctx => {
  const filters = getFiltersFromContext(ctx);
  try {
    await Promise.all([
      ctx.reduxStore.dispatch(fetchFundsAction(filters, ctx.token))
    ]);
  } catch (e) {}

  const outerView = getTableView(ctx);
  console.log("getInitialProps", outerView);
  return { outerView };
};

export default withDefaultLayout(Page);

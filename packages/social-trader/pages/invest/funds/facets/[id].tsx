import platformActions from "actions/platform-actions";
import withDefaultLayout from "decorators/with-default-layout";
import FundsFacetPage from "pages/invest/funds/funds-facet/funds-facet.page";
import FundsWeeklyContainer, {
  FUNDS_WEEKLY_FACET_NAME
} from "pages/invest/funds/funds-facet/funds-weekly/funds-weekly.container";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<Props, {}> = ({ id }) => {
  if (id === FUNDS_WEEKLY_FACET_NAME) {
    return <FundsWeeklyContainer />;
  }
  return <FundsFacetPage id={id} />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  await Promise.all([
    ctx.reduxStore.dispatch(
      async dispatch => await dispatch(platformActions.fetchPlatformSettings())
    )
  ]);
  return {
    namespacesRequired: ["funds-page", "asset-list"],
    id
  };
};

interface Props {
  id: string;
}

export default compose(withDefaultLayout)(Page);

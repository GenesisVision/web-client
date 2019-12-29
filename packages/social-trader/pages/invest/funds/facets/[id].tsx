import platformActions from "actions/platform-actions";
import FundsFacetPage from "components/funds/funds-facet/funds-facet.page";
import withDefaultLayout from "decorators/with-default-layout";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<Props, {}> = ({ id }) => {
  return <FundsFacetPage id={id} />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  await Promise.all([
    ctx.reduxStore.dispatch(
      async dispatch => await dispatch(platformActions.fetchPlatformSettings())
    )
  ]);
  return { id };
};

interface Props {
  id: string;
}

export default compose(withDefaultLayout)(Page);

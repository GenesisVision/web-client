import React from "react";
import { compose } from "redux";
import platformActions from "shared/actions/platform-actions";
import FundsFacetPage from "shared/components/funds/funds-facet/funds-facet.page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import { NextPageWithRedux } from "shared/utils/types";

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

export const FundFacet = compose(withDefaultLayout)(Page);

interface Props {
  id: string;
}

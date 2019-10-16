import React from "react";
import { compose } from "redux";
import platformActions from "shared/actions/platform-actions";
import ProgramsRatingContainer from "shared/components/programs-rating/programs-rating-container";
import ProgramsFacetPage from "shared/components/programs/programs-facet/programs-facet.page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import { NextPageWithRedux } from "shared/utils/types";

const Page: NextPageWithRedux<Props, {}> = ({ id }) => {
  if (id === "most_reliable") {
    return <ProgramsRatingContainer />;
  }
  return <ProgramsFacetPage id={id} />;
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

export const ProgramFacet = compose(withDefaultLayout)(Page);

interface Props {
  id: string;
}

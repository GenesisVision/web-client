import React from "react";
import { compose } from "redux";
import platformActions from "shared/actions/platform-actions";
import ProgramsRatingContainer from "shared/components/programs-rating/programs-rating-container";
import withDefaultLayout from "shared/decorators/with-default-layout";
import { NextPageWithRedux } from "shared/utils/types";

const ProgramRatingFacet: NextPageWithRedux<Props, {}> = () => {
  return <ProgramsRatingContainer />;
};

ProgramRatingFacet.getInitialProps = async ctx => {
  await Promise.all([
    ctx.reduxStore.dispatch(
      async dispatch => await dispatch(platformActions.fetchPlatformSettings())
    )
  ]);
  return {};
};

export default compose(withDefaultLayout)(ProgramRatingFacet);

interface Props {}

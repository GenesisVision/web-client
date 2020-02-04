import ProgramsRatingContainer from "components/programs-rating/programs-rating-container";
import withDefaultLayout from "decorators/with-default-layout";
import ProgramsFacetPage from "pages/invest/programs/programs-facet/programs-facet.page";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<Props, {}> = ({ id }) => {
  if (id === "most_reliable") {
    return <ProgramsRatingContainer />;
  }
  return <ProgramsFacetPage id={id} />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  return { id };
};

export const ProgramFacet = compose(withDefaultLayout)(Page);

interface Props {
  id: string;
}

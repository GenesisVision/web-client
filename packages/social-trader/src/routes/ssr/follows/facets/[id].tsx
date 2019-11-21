import FollowsFacetPage from "components/follows/follows-facet/follows-facet.page";
import withDefaultLayout from "decorators/with-default-layout";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<Props, {}> = ({ id }) => {
  return <FollowsFacetPage id={id} />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  return { id };
};

export const FollowsFacet = compose(withDefaultLayout)(Page);

interface Props {
  id: string;
}

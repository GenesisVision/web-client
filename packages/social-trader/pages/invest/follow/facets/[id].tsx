import withDefaultLayout from "decorators/with-default-layout";
import FollowsFacetPage from "pages/invest/follows/follows-facet/follows-facet.page";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<Props, {}> = ({ id }) => {
  return <FollowsFacetPage id={id} />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  return {
    namespacesRequired: ["follows-page", "asset-list"],
    id
  };
};

export default compose(withDefaultLayout)(Page);

interface Props {
  id: string;
}

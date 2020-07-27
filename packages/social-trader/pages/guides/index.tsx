import { fetchGuides } from "components/guides/services/guides.services";
import withDefaultLayout from "decorators/with-default-layout";
import GuidesPage from "pages/guides/guides.page";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<{}> = () => {
  return <GuidesPage />;
};

Page.getInitialProps = async ctx => {
  await Promise.all([ctx.reduxStore.dispatch(fetchGuides(ctx))]);
  return { namespacesRequired: ["guides"] };
};

export default compose(withDefaultLayout)(Page);

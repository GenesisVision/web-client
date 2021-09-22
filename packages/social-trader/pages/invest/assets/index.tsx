import withDefaultLayout from "decorators/with-default-layout";
import React from "react";
import { NextPageWithRedux } from "utils/types";
import AssetsPage from "pages/invest/assets/assets.page";

const Page: NextPageWithRedux<{}> = () => {
  return <AssetsPage />;
};

Page.getInitialProps = async () => ({
  namespacesRequired: [
    "assets-page"
  ]
});

Page.getInitialProps = () => {
  return {
    namespacesRequired: ["assets-page"]
  };
};

export default withDefaultLayout(Page);

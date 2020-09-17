import withDefaultLayout from "decorators/with-default-layout";
import React from "react";
import { NextPageWithRedux } from "utils/types";
import Page from "components/page/page";

const Component: NextPageWithRedux = () => {
  return <Page title={""}/>;
};

export default withDefaultLayout(Component);

import React from "react";
import { compose } from "redux";
import GlobalSearchPage from "shared/components/global-search/global-search.page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";

const GlobalSearch: React.FC = () => {
  return <GlobalSearchPage />;
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(GlobalSearch);

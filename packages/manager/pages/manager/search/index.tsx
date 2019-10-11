import React from "react";
import { compose } from "redux";
import GlobalSearchPage from "shared/components/global-search/global-search.page";
import withDefaultLayout from "shared/decorators/with-default-layout";

const GlobalSearch: React.FC = () => {
  return <GlobalSearchPage />;
};

export default compose(withDefaultLayout)(GlobalSearch);

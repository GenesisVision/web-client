import React from "react";
import { compose } from "redux";
import GlobalSearchPage from "shared/components/global-search/global-search.page";
import withDefaultLayout from "shared/decorators/with-default-layout";

const Page: React.FC = () => {
  return <GlobalSearchPage />;
};

export const Search = compose(withDefaultLayout)(Page);

import GlobalSearchPage from "components/global-search/global-search.page";
import withDefaultLayout from "decorators/with-default-layout";
import React from "react";
import { compose } from "redux";

const Page: React.FC = () => {
  return <GlobalSearchPage />;
};

export const Search = compose(withDefaultLayout)(Page);

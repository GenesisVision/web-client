import withBetaTesting from "decorators/with-beta-testing";
import withDefaultLayout from "decorators/with-default-layout";
import { NextPage } from "next";
import { NewsPage } from "pages/news/news.page";
import React from "react";
import { compose } from "redux";

const Page: NextPage = () => {
  return <NewsPage />;
};

export default compose(withDefaultLayout, withBetaTesting("Social"))(Page);

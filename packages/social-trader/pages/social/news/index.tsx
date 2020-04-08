import withBetaTesting from "decorators/with-beta-testing";
import withDefaultLayout from "decorators/with-default-layout";
import { NextPage } from "next";
import { FeedPage } from "pages/feed/feed.page";
import React from "react";
import { compose } from "redux";

const Page: NextPage = () => {
  return <FeedPage />;
};

export default compose(withDefaultLayout, withBetaTesting)(Page);

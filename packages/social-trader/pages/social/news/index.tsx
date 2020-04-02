import withDefaultLayout from "decorators/with-default-layout";
import { NextPage } from "next";
import { FeedPage } from "pages/feed/feed.page";
import React from "react";

const Page: NextPage = () => {
  return <FeedPage />;
};

export default withDefaultLayout(Page);

import withDefaultLayout from "decorators/with-default-layout";
import { NextPage } from "next";
import { RatingPage } from "pages/rating/rating.page";
import React from "react";

const Page: NextPage = () => {
  return <RatingPage />;
};

export default withDefaultLayout(Page);

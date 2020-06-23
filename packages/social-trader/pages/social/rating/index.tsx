import withBetaTesting from "decorators/with-beta-testing";
import withDefaultLayout from "decorators/with-default-layout";
import { NextPage } from "next";
import { RatingPage } from "pages/rating/rating.page";
import React from "react";
import { compose } from "redux";

const Page: NextPage = () => {
  return <RatingPage />;
};

Page.getInitialProps = async () => ({
  namespacesRequired: ["conversation"]
});

export default compose(withDefaultLayout, withBetaTesting("Social"))(Page);

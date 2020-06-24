import withBetaTesting from "decorators/with-beta-testing";
import withDefaultLayout from "decorators/with-default-layout";
import { SocialSummary } from "gv-api-web";
import { NextPage } from "next";
import { getSocialPageData } from "pages/social/social/services/social-page.service";
import { SocialPage } from "pages/social/social/social.page";
import React from "react";
import { compose } from "redux";

interface Props {
  data: SocialSummary;
}

const Page: NextPage<Props> = ({ data }) => {
  return <SocialPage data={data} />;
};

Page.getInitialProps = async () => {
  const data = await getSocialPageData();
  return {
    data,
    namespacesRequired: ["social-page"]
  };
};

export default compose(withDefaultLayout, withBetaTesting("Social"))(Page);

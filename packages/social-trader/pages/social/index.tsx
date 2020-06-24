import withBetaTesting from "decorators/with-beta-testing";
import withDefaultLayout from "decorators/with-default-layout";
import { SocialSummary } from "gv-api-web";
import { getSocialPageData } from "pages/social/social/services/social-page.service";
import { SocialPage } from "pages/social/social/social.page";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

interface Props {
  data: SocialSummary;
}

const Page: NextPageWithRedux<Props> = ({ data }) => {
  return <SocialPage data={data} />;
};

Page.getInitialProps = async ctx => {
  const data = await getSocialPageData(ctx.token);
  return {
    data,
    namespacesRequired: ["social-page"]
  };
};

export default compose(withDefaultLayout, withBetaTesting("Social"))(Page);

import { getGlobalFeed } from "components/conversation/conversation.service";
import { initialOptions } from "components/notifications/components/notifications.helpers";
import withDefaultLayout from "decorators/with-default-layout";
import { PostItemsViewModel, SocialSummary } from "gv-api-web";
import { getSocialPageData } from "pages/social/social/services/social-page.service";
import { SocialPage } from "pages/social/social/social.page";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

interface Props {
  initFeedData?: PostItemsViewModel;
  data: SocialSummary;
}

const Page: NextPageWithRedux<Props> = ({ initFeedData, data }) => {
  return <SocialPage initFeedData={initFeedData} data={data} />;
};

Page.getInitialProps = async ctx => {
  const data = await getSocialPageData(ctx.token);
  const initFeedData = await getGlobalFeed(initialOptions);
  return {
    initFeedData,
    data,
    namespacesRequired: ["form-fields", "conversation", "social-page"]
  };
};

export default compose(withDefaultLayout)(Page);

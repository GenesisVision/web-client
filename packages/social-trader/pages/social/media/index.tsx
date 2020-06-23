import { getSocialMedia } from "components/conversation/conversation.service";
import { initialOptions } from "components/notifications/components/notifications.helpers";
import withBetaTesting from "decorators/with-beta-testing";
import withDefaultLayout from "decorators/with-default-layout";
import { NextPage } from "next";
import { INewsListContainerInitData } from "pages/news/news-list/news-list.container";
import { NewsPage } from "pages/news/news.page";
import React from "react";
import { compose } from "redux";

interface Props extends INewsListContainerInitData {}

const Page: NextPage<Props> = ({ initData }) => {
  return <NewsPage initData={initData} />;
};

Page.getInitialProps = async () => {
  const initData = await getSocialMedia(initialOptions);
  return { namespacesRequired: ["conversation"], initData };
};

export default compose(withDefaultLayout, withBetaTesting("Social"))(Page);

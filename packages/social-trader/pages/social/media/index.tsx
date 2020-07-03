import { getSocialMedia } from "components/conversation/conversation.service";
import { initialOptions } from "components/notifications/components/notifications.helpers";
import withDefaultLayout from "decorators/with-default-layout";
import { INewsListContainerInitData } from "pages/news/news-list/news-list.container";
import { NewsPage } from "pages/news/news.page";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

interface Props extends INewsListContainerInitData {}

const Page: NextPageWithRedux<Props> = ({ initData }) => {
  return <NewsPage initData={initData} />;
};

Page.getInitialProps = async ctx => {
  const initData = await getSocialMedia(initialOptions, ctx.token);
  return {
    initData
  };
};

export default compose(withDefaultLayout)(Page);

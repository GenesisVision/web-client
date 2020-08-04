import {
  FollowDetailsListItemItemsViewModel,
  FundDetailsListItemItemsViewModel,
  PlatformEvent,
  PlatformNews,
  ProgramDetailsListItemItemsViewModel
} from "gv-api-web";
import { GetStaticProps, NextPage } from "next";
import { getAccept } from "pages/landing-page/components/cookie-message/cookie-message.helpers";
import { LandingPage } from "pages/landing-page/landing.page";
import {
  getLandingAssets,
  landingAssetsDefaultData
} from "pages/landing-page/services/landing.service";
import React from "react";

const IndexPage: NextPage<Props> = props => {
  return <LandingPage {...props} />;
};

export const getStaticProps: GetStaticProps = async ctx => {
  // @ts-ignore
  const cookieAccept = false;
  const namespacesRequired = ["fees", "auth", "landing-page"];
  try {
    const { events, follows, programs, funds, news } = await getLandingAssets();
    return {
      props: {
        cookieAccept,
        events,
        follows,
        programs,
        funds,
        news,
        namespacesRequired
      }
    };
  } catch (e) {
    return {
      props: { cookieAccept, namespacesRequired, ...landingAssetsDefaultData }
    };
  }
};

interface Props {
  cookieAccept?: string;
  refLink?: string;
  events: Array<PlatformEvent>;
  follows: FollowDetailsListItemItemsViewModel;
  programs: ProgramDetailsListItemItemsViewModel;
  funds: FundDetailsListItemItemsViewModel;
  news: Array<PlatformNews>;
}

export default IndexPage;

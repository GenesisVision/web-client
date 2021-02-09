import {
  FollowDetailsListItemItemsViewModel,
  FundDetailsListItemItemsViewModel,
  PlatformEvent,
  PlatformNews,
  ProgramDetailsListItemItemsViewModel
} from "gv-api-web";
import { GetServerSideProps, NextPage } from "next";
import { getAccept } from "pages/landing-page/components/cookie-message/cookie-message.helpers";
import { LandingPage } from "pages/landing-page/landing.page";
import { getLandingAssets, landingAssetsDefaultData } from "pages/landing-page/services/landing.service";
import React from "react";

interface Props {
  cookieAccept?: string;
  refLink?: string;
  events: Array<PlatformEvent>;
  follows: FollowDetailsListItemItemsViewModel;
  programs: ProgramDetailsListItemItemsViewModel;
  funds: FundDetailsListItemItemsViewModel;
  news: Array<PlatformNews>;
}

const IndexPage: NextPage<Props> = props => {
  return <LandingPage {...props} />;
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const cookieAccept = getAccept(ctx);
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

export default IndexPage;

import {
  FollowDetailsListItemItemsViewModel,
  FundDetailsListItemItemsViewModel,
  PlatformEvent,
  PlatformNews,
  ProgramDetailsListItemItemsViewModel
} from "gv-api-web";
import { NextPage } from "next";
import { LandingPage } from "pages/landing-page/landing.page";
import {
  getLandingAssets,
  landingAssetsDefaultData
} from "pages/landing-page/services/landing.service";
import React from "react";

const IndexPage: NextPage<Props> = props => {
  return <LandingPage {...props} />;
};

IndexPage.getInitialProps = async () => {
  try {
    const { events, follows, programs, funds, news } = await getLandingAssets();
    return {
      events,
      follows,
      programs,
      funds,
      news,
      namespacesRequired: ["landing-page"]
    };
  } catch (e) {
    return {
      namespacesRequired: ["landing-page"],
      ...landingAssetsDefaultData
    };
  }
};

interface Props {
  refLink?: string;
  events: Array<PlatformEvent>;
  follows: FollowDetailsListItemItemsViewModel;
  programs: ProgramDetailsListItemItemsViewModel;
  funds: FundDetailsListItemItemsViewModel;
  news: Array<PlatformNews>;
}

export default IndexPage;

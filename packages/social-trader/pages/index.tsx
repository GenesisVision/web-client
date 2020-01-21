import {
  ItemsViewModelFollowDetailsListItem,
  ItemsViewModelFundDetailsListItem,
  ItemsViewModelProgramDetailsListItem,
  PlatformEvent,
  PlatformNews
} from "gv-api-web";
import { NextPage, NextPageContext } from "next";
import React from "react";
import { LandingPage } from "routes/ssr/landing-page/landing.page";
import platformApi from "services/api-client/platform-api";
import { addRequestAnimationFrame } from "utils/helpers";
import { getParamsFromCtx } from "utils/ssr-helpers";

const IndexPage: NextPage<Props> = props => {
  return <LandingPage {...props} />;
};

IndexPage.getInitialProps = async (ctx: NextPageContext) => {
  const { ref } = getParamsFromCtx(ctx);
  try {
    addRequestAnimationFrame();
    const {
      events,
      follows,
      programs,
      funds,
      news
    } = await platformApi.getPlatformLandingInfo({
      eventsTake: 5,
      followTake: 6,
      programsTake: 6,
      fundsTake: 12,
      newsTake: 4
    });
    return {
      events,
      follows,
      programs,
      funds,
      news,
      refLink: ref
    };
  } catch (e) {
    const funds = {
      total: 0,
      items: []
    };
    const follows = {
      total: 0,
      items: []
    };
    const programs = {
      total: 0,
      items: []
    };
    return {
      events: [],
      follows,
      programs,
      funds,
      news: [],
      refLink: ""
    };
  }
};

interface Props {
  refLink?: string;
  events: Array<PlatformEvent>;
  follows: ItemsViewModelFollowDetailsListItem;
  programs: ItemsViewModelProgramDetailsListItem;
  funds: ItemsViewModelFundDetailsListItem;
  news: Array<PlatformNews>;
}

export default IndexPage;

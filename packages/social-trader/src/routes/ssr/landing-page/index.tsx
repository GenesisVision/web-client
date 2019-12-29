import "./styles/index.scss";
import "./styles/home.scss";

import {
  ItemsViewModelFollowDetailsListItem,
  ItemsViewModelFundDetailsListItem,
  ItemsViewModelProgramDetailsListItem,
  PlatformEvents
} from "gv-api-web";
import { fetchFollows } from "modules/follows-table/services/follows-table.service";
import { fetchFunds } from "modules/funds-table/services/funds-table.service";
import { fetchPrograms } from "modules/programs-table/services/programs-table.service";
import { NextPage, NextPageContext } from "next";
import * as qs from "qs";
import React from "react";
import { LandingPage } from "routes/ssr/landing-page/landing.page";
import platformApi from "services/api-client/platform-api";
import { subtractDate } from "shared/utils/dates";
import { addRequestAnimationFrame } from "utils/helpers";

const IndexPage: NextPage<Props> = props => {
  return <LandingPage {...props} />;
};

IndexPage.getInitialProps = async (ctx: NextPageContext) => {
  const { asPath = "", pathname } = ctx;
  const { ref } = qs.parse(asPath.slice(pathname.length + 1));
  try {
    addRequestAnimationFrame();
    const dateTo = new Date();
    const dateFrom = subtractDate(dateTo, 1, "month");
    const [
      programsData,
      fundsData,
      followsData,
      eventsData
    ] = await Promise.all([
      fetchPrograms({
        sorting: "ByProfitDesc",
        levelMin: 1,
        levelMax: 7,
        dateFrom,
        dateTo,
        skip: 0,
        take: 6
      }),
      fetchFunds({
        sorting: "ByProfitDesc",
        showIn: "USDT",
        dateFrom,
        dateTo,
        skip: 0,
        take: 12
      }),
      fetchFollows({
        sorting: "BySubscribersDesc",
        skip: 0,
        take: 6
      }),
      platformApi.getPlatformEvents({
        take: 5
      })
    ]);
    return {
      programsData,
      fundsData,
      followsData,
      eventsData,
      refLink: ref
    };
  } catch (e) {
    const programsData = {
      total: 0,
      items: []
    };
    const fundsData = {
      total: 0,
      items: []
    };
    const followsData = {
      total: 0,
      items: []
    };
    const eventsData = {
      events: []
    };
    return {
      programsData,
      fundsData,
      followsData,
      eventsData,
      refLink: ""
    };
  }
};

interface Props {
  refLink?: string;
  programsData: ItemsViewModelProgramDetailsListItem;
  fundsData: ItemsViewModelFundDetailsListItem;
  followsData: ItemsViewModelFollowDetailsListItem;
  eventsData: PlatformEvents;
}

export default IndexPage;

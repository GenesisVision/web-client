import "./styles/index.scss";
import "./styles/home.scss";

import {
  ItemsViewModelFollowDetailsListItem,
  ItemsViewModelFundDetailsListItem,
  ItemsViewModelProgramDetailsListItem
} from "gv-api-web";
import { NextPage } from "next";
import React from "react";
import BestList from "routes/ssr/landing-page/components/best/best-list";
import FirstSlider from "routes/ssr/landing-page/components/first-slider/first-slifer";
import NewsList from "routes/ssr/landing-page/components/news/news-list";
import AdvantagesContainer from "routes/ssr/landing-page/containers/advantages-container/advantages-container";
import BrokersContainer from "routes/ssr/landing-page/containers/brokers-container/brokers-container";
import DownloadContainer from "routes/ssr/landing-page/containers/download-container/download-container";
import FundsContainer from "routes/ssr/landing-page/containers/funds-container/funds-container";
import ProgramsContainer from "routes/ssr/landing-page/containers/programs-container/programs-container";
import SocialContainer from "routes/ssr/landing-page/containers/social-container/social-container";
import TabsContainer from "routes/ssr/landing-page/containers/tabs-container/tabs-container";
import TradersContainer from "routes/ssr/landing-page/containers/traders-container/traders-container";
import Layout from "routes/ssr/landing-page/layouts/_layout";
import {
  brokersInfo,
  brokersTabs
} from "routes/ssr/landing-page/static-data/brokers";
import { slides } from "routes/ssr/landing-page/static-data/slides";
import followApi from "services/api-client/follow-api";
import fundsApi from "services/api-client/funds-api";
import programsApi from "services/api-client/programs-api";
import { subtractDate } from "shared/utils/dates";

const IndexPage: NextPage<{
  programsData: ItemsViewModelProgramDetailsListItem;
  fundsData: ItemsViewModelFundDetailsListItem;
  followsData: ItemsViewModelFollowDetailsListItem;
}> = ({ programsData, fundsData, followsData }) => {
  return (
    <Layout title="Genesis Vision">
      <main className="home">
        <section className="home__section home__section--first-screen">
          <div className="home__container">
            <FirstSlider className="home__grid-row" slidesItems={slides} />
            <div className="home__grid-row home__grid-row--mob-wider">
              <NewsList className="home__grid-item" />
            </div>
          </div>
        </section>
        <section className="home__section home__section--bg-white home__section--horizontal-padding">
          <div className="home__container">
            <div className="home__grid-row">
              <div className="home__grid-item home__grid-item--sm">
                <BestList />
              </div>
            </div>
          </div>
        </section>
        <section className="home__section home__section--bg-gray">
          <div className="home__container">
            <TradersContainer />
          </div>
        </section>
        <section className="home__section">
          <div className="home__container">
            <ProgramsContainer programs={programsData.items} />
          </div>
        </section>
        <section className="home__section home__section--bg-gray">
          <div className="home__container">
            <FundsContainer funds={fundsData.items} />
          </div>
        </section>
        <section className="home__section home__section--bg-white">
          <div className="home__container">
            <TabsContainer />
          </div>
        </section>
        <section className="home__section home__section--bg-gray">
          <div className="home__container">
            <DownloadContainer />
          </div>
        </section>
        <AdvantagesContainer />
        <section className="home__section home__section--bg-gray">
          <div className="home__container">
            <BrokersContainer
              brokersInfo={brokersInfo}
              brokersTabs={brokersTabs}
              title="Brokers and Exhanges"
            />
          </div>
        </section>
        <section className="home__section home__section--last-screen">
          <div className="home__container">
            <SocialContainer />
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default IndexPage;

IndexPage.getInitialProps = async () => {
  try {
    const dateTo = new Date();
    const dateFrom = subtractDate(dateTo, 1, "week");
    const [programsData, fundsData, followsData] = await Promise.all([
      programsApi.getPrograms({
        sorting: "ByProfitDesc",
        levelMin: 1,
        levelMax: 7,
        dateFrom,
        dateTo,
        skip: 0,
        take: 6
      }),
      fundsApi.getFunds({
        sorting: "ByProfitDesc",
        showIn: "USDT",
        dateFrom,
        dateTo,
        skip: 0,
        take: 12
      }),
      followApi.getFollowAssets({
        sorting: "BySubscribersDesc",
        skip: 0,
        take: 6
      })
    ]);
    return { programsData, fundsData, followsData };
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
    return { programsData, fundsData, followsData };
  }
};

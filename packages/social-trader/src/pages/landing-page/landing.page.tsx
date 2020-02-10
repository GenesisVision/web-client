import "./styles/index.scss";
import "./styles/home.scss";

import {
  ItemsViewModelFollowDetailsListItem,
  ItemsViewModelFundDetailsListItem,
  ItemsViewModelProgramDetailsListItem,
  PlatformEvent,
  PlatformNews
} from "gv-api-web";
import FirstScreen from "pages/landing-page/components/first-screen/first-screen";
import AdvantagesContainer from "pages/landing-page/containers/advantages-container/advantages-container";
import BrokersContainer from "pages/landing-page/containers/brokers-container/brokers-container";
import DownloadContainer from "pages/landing-page/containers/download-container/download-container";
import EventsContainer from "pages/landing-page/containers/events-container/events-container";
import FollowsContainer from "pages/landing-page/containers/follows-container/follows-container";
import FundsContainer from "pages/landing-page/containers/funds-container/funds-container";
import InfoContainer from "pages/landing-page/containers/info-container/info-container";
import ProgramsContainer from "pages/landing-page/containers/programs-container/programs-container";
import SocialContainer from "pages/landing-page/containers/social-container/social-container";
import Layout from "pages/landing-page/layouts/_layout";
import {
  brokersInfo,
  brokersTabs
} from "pages/landing-page/static-data/brokers";
import { useUtm } from "pages/landing-page/utils";
import React from "react";

const _LandingPage: React.FC<Props> = ({
  programs,
  funds,
  follows,
  events,
  news,
  refLink
}) => {
  useUtm();
  return (
    <Layout
      description="Join the global market, trade Crypto, Forex, Metals, Stocks, Indices ans Commodities, create and manage own funds, invest and follow best trading strategies."
      title="Genesis Vision - The Next Generation Social Trading Platform"
    >
      <main className="home">
        <FirstScreen news={news} />
        <EventsContainer events={events} />
        <section className="home__section home__section--bg-gray">
          <div className="home__container">
            <FollowsContainer follows={follows.items} />
          </div>
        </section>
        <section className="home__section">
          <div className="home__container">
            <ProgramsContainer programs={programs.items} />
          </div>
        </section>
        <section className="home__section home__section--bg-gray">
          <div className="home__container">
            <FundsContainer funds={funds.items} />
          </div>
        </section>
        <section id="info" className="home__section home__section--bg-white">
          <div className="home__container">
            <InfoContainer />
          </div>
        </section>
        <section className="home__section home__section--bg-gray">
          <div className="home__container">
            <DownloadContainer />
          </div>
        </section>
        <AdvantagesContainer />
        <section className="home__section home__section--bg-gray home__section--horizontal-padding">
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

interface Props {
  refLink?: string;
  programs: ItemsViewModelProgramDetailsListItem;
  funds: ItemsViewModelFundDetailsListItem;
  follows: ItemsViewModelFollowDetailsListItem;
  events: Array<PlatformEvent>;
  news: Array<PlatformNews>;
}
export const LandingPage = React.memo(_LandingPage);

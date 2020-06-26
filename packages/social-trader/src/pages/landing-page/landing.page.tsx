import {
  FollowDetailsListItemItemsViewModel,
  FundDetailsListItemItemsViewModel,
  PlatformEvent,
  PlatformNews,
  ProgramDetailsListItemItemsViewModel
} from "gv-api-web";
import { useTranslation } from "i18n";
import FirstScreen from "pages/landing-page/components/first-screen/first-screen";
import { HomeContainer } from "pages/landing-page/components/home/home.blocks";
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

import styles from "./home.module.scss";

const _LandingPage: React.FC<Props> = ({
  programs,
  funds,
  follows,
  events,
  news
}) => {
  const { t } = useTranslation();
  useUtm();
  return (
    <Layout
      description={t("landing-page:description")}
      title={t("landing-page:title")}
    >
      <main>
        <section className="home__section home__section--first-screen">
          <HomeContainer>
            <FirstScreen news={news} />
          </HomeContainer>
        </section>
        <section className="home__section home__section--bg-white">
          <HomeContainer>
            <EventsContainer events={events} />
          </HomeContainer>
        </section>
        <section className="home__section home__section--bg-gray">
          <HomeContainer>
            <FollowsContainer follows={follows.items} />
          </HomeContainer>
        </section>
        <section className="home__section">
          <HomeContainer>
            <ProgramsContainer programs={programs.items} />
          </HomeContainer>
        </section>
        <section className="home__section home__section--bg-gray">
          <HomeContainer>
            <FundsContainer funds={funds.items} />
          </HomeContainer>
        </section>
        <section id="info" className="home__section home__section--bg-white">
          <HomeContainer>
            <InfoContainer />
          </HomeContainer>
        </section>
        <section className="home__section home__section--bg-gray">
          <HomeContainer>
            <DownloadContainer />
          </HomeContainer>
        </section>
        <AdvantagesContainer />
        <section className="home__section home__section--bg-gray home__section--horizontal-padding">
          <HomeContainer>
            <BrokersContainer
              brokersInfo={brokersInfo}
              brokersTabs={brokersTabs}
              title={t("landing-page:brokers.title")}
            />
          </HomeContainer>
        </section>
        <section className="home__section home__section--last-screen">
          <HomeContainer>
            <SocialContainer />
          </HomeContainer>
        </section>
      </main>
    </Layout>
  );
};

interface Props {
  refLink?: string;
  programs: ProgramDetailsListItemItemsViewModel;
  funds: FundDetailsListItemItemsViewModel;
  follows: FollowDetailsListItemItemsViewModel;
  events: Array<PlatformEvent>;
  news: Array<PlatformNews>;
}
export const LandingPage = React.memo(_LandingPage);

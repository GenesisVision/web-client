import "./styles/index.scss";
import "./styles/home.scss";

import { REFERRAL_CODE } from "components/auth/signup/signup.constants";
import {
  ItemsViewModelFollowDetailsListItem,
  ItemsViewModelFundDetailsListItem,
  ItemsViewModelProgramDetailsListItem,
  PlatformEvents
} from "gv-api-web";
import React, { useEffect } from "react";
import FirstScreen from "routes/ssr/landing-page/components/first-screen/first-screen";
import AdvantagesContainer from "routes/ssr/landing-page/containers/advantages-container/advantages-container";
import BrokersContainer from "routes/ssr/landing-page/containers/brokers-container/brokers-container";
import DownloadContainer from "routes/ssr/landing-page/containers/download-container/download-container";
import EventsContainer from "routes/ssr/landing-page/containers/events-container/events-container";
import FollowsContainer from "routes/ssr/landing-page/containers/follows-container/follows-container";
import FundsContainer from "routes/ssr/landing-page/containers/funds-container/funds-container";
import InfoContainer from "routes/ssr/landing-page/containers/info-container/info-container";
import ProgramsContainer from "routes/ssr/landing-page/containers/programs-container/programs-container";
import SocialContainer from "routes/ssr/landing-page/containers/social-container/social-container";
import Layout from "routes/ssr/landing-page/layouts/_layout";
import {
  brokersInfo,
  brokersTabs
} from "routes/ssr/landing-page/static-data/brokers";
import { setCookie } from "shared/utils/cookie";

const _LandingPage: React.FC<Props> = ({
  programsData,
  fundsData,
  followsData,
  eventsData,
  refLink
}) => {
  useEffect(() => {
    if (typeof window !== undefined && refLink)
      setCookie(REFERRAL_CODE, refLink);
  }, [window]);
  return (
    <Layout title="Genesis Vision">
      <main className="home">
        <FirstScreen />
        <EventsContainer events={eventsData.events} />
        <section className="home__section home__section--bg-gray">
          <div className="home__container">
            <FollowsContainer follows={followsData.items} />
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
  programsData: ItemsViewModelProgramDetailsListItem;
  fundsData: ItemsViewModelFundDetailsListItem;
  followsData: ItemsViewModelFollowDetailsListItem;
  eventsData: PlatformEvents;
}
export const LandingPage = React.memo(_LandingPage);

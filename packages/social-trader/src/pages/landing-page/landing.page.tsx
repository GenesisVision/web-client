import "./styles/index.scss";
import "./styles/home.scss";

import { LandingInfo } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import { useTranslation } from "i18n";
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
  getLandingAssets,
  landingAssetsDefaultData
} from "pages/landing-page/services/landing.service";
import {
  brokersInfo,
  brokersTabs
} from "pages/landing-page/static-data/brokers";
import { useUtm } from "pages/landing-page/utils";
import React from "react";

const _LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const { data } = useApiRequest({
    request: getLandingAssets,
    fetchOnMount: true,
    defaultData: landingAssetsDefaultData
  });
  const { programs, funds, follows, events, news } = data as LandingInfo;
  useUtm();
  return (
    <Layout
      description={t("landing-page.description")}
      title={t("landing-page.title")}
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
              title={t("landing-page.brokers.title")}
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

export const LandingPage = React.memo(_LandingPage);

import {
  FollowDetailsListItemItemsViewModel,
  FundDetailsListItemItemsViewModel,
  PlatformEvent,
  PlatformNews,
  ProgramDetailsListItemItemsViewModel
} from "gv-api-web";
import { useTranslation } from "i18n";
import FirstScreen from "pages/landing-page/components/first-screen/first-screen";
import {
  FirstScreenHomeSection,
  HomeContainer,
  HomeSection,
  LastScreenHomeSection
} from "pages/landing-page/components/home/home.blocks";
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

interface Props {
  cookieAccept?: string;
  refLink?: string;
  programs: ProgramDetailsListItemItemsViewModel;
  funds: FundDetailsListItemItemsViewModel;
  follows: FollowDetailsListItemItemsViewModel;
  events: Array<PlatformEvent>;
  news: Array<PlatformNews>;
}

const _LandingPage: React.FC<Props> = ({
  cookieAccept,
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
      cookieAccept={cookieAccept}
      description={t("landing-page:description")}
      title={t("landing-page:title")}
    >
      <main>
        <FirstScreenHomeSection>
          <HomeContainer tall>
            <FirstScreen news={news} />
          </HomeContainer>
        </FirstScreenHomeSection>
        <HomeSection bgColor="white">
          <HomeContainer>
            <EventsContainer events={events} />
          </HomeContainer>
        </HomeSection>
        <HomeSection bgColor="gray">
          <HomeContainer>
            <FundsContainer funds={funds.items} />
          </HomeContainer>
        </HomeSection>
        <section className="home__section">
          <HomeContainer>
            <ProgramsContainer programs={programs.items} />
          </HomeContainer>
        </section>
        <HomeSection bgColor="gray">
          <HomeContainer>
            <FollowsContainer follows={follows.items} />
          </HomeContainer>
        </HomeSection>
        <HomeSection id="info" bgColor="white">
          <HomeContainer>
            <InfoContainer />
          </HomeContainer>
        </HomeSection>
        <HomeSection bgColor="gray">
          <HomeContainer>
            <DownloadContainer />
          </HomeContainer>
        </HomeSection>
        <HomeSection bgColor="white">
          <AdvantagesContainer />
        </HomeSection>
        <HomeSection bgColor="gray" hasPadding>
          <HomeContainer>
            <BrokersContainer
              brokersInfo={brokersInfo}
              brokersTabs={brokersTabs}
              title={t("landing-page:brokers.title")}
            />
          </HomeContainer>
        </HomeSection>
        <LastScreenHomeSection>
          <HomeContainer>
            <SocialContainer />
          </HomeContainer>
        </LastScreenHomeSection>
      </main>
    </Layout>
  );
};

export const LandingPage = React.memo(_LandingPage);

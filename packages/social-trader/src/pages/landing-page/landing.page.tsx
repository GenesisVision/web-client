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
  HomeContainer,
  HomeSection,
  LazyHomeSection
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
        <HomeSection isFirst>
          <HomeContainer>
            <FirstScreen news={news} />
          </HomeContainer>
        </HomeSection>
        <LazyHomeSection bgColor="white">
          <HomeContainer>
            <EventsContainer events={events} />
          </HomeContainer>
        </LazyHomeSection>
        <LazyHomeSection bgColor="gray">
          <HomeContainer>
            <FundsContainer funds={funds.items} />
          </HomeContainer>
        </LazyHomeSection>
        <section className="home__section">
          <HomeContainer>
            <ProgramsContainer programs={programs.items} />
          </HomeContainer>
        </section>
        <LazyHomeSection bgColor="gray">
          <HomeContainer>
            <FollowsContainer follows={follows.items} />
          </HomeContainer>
        </LazyHomeSection>
        <LazyHomeSection id="info" bgColor="white">
          <HomeContainer>
            <InfoContainer />
          </HomeContainer>
        </LazyHomeSection>
        <LazyHomeSection bgColor="gray">
          <HomeContainer>
            <DownloadContainer />
          </HomeContainer>
        </LazyHomeSection>
        <LazyHomeSection bgColor="white">
          <AdvantagesContainer />
        </LazyHomeSection>
        <LazyHomeSection bgColor="gray" hasPadding>
          <HomeContainer>
            <BrokersContainer
              brokersInfo={brokersInfo}
              brokersTabs={brokersTabs}
              title={t("landing-page:brokers.title")}
            />
          </HomeContainer>
        </LazyHomeSection>
        <LazyHomeSection isLast>
          <HomeContainer>
            <SocialContainer />
          </HomeContainer>
        </LazyHomeSection>
      </main>
    </Layout>
  );
};

interface Props {
  cookieAccept?: string;
  refLink?: string;
  programs: ProgramDetailsListItemItemsViewModel;
  funds: FundDetailsListItemItemsViewModel;
  follows: FollowDetailsListItemItemsViewModel;
  events: Array<PlatformEvent>;
  news: Array<PlatformNews>;
}
export const LandingPage = React.memo(_LandingPage);

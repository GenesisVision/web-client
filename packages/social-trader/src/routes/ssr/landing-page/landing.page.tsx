import "./styles/index.scss";
import "./styles/home.scss";

import { REFERRAL_CODE } from "components/auth/signup/signup.constants";
import {
  ItemsViewModelFollowDetailsListItem,
  ItemsViewModelFundDetailsListItem,
  ItemsViewModelProgramDetailsListItem,
  PlatformEvent
} from "gv-api-web";
import { useLocalStorage } from "hooks/localstorage";
import { useLocation } from "hooks/location";
import * as qs from "qs";
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
  programs,
  funds,
  follows,
  events,
  refLink
}) => {
  const { location } = useLocation();
  const { setToStorage } = useLocalStorage();
  useEffect(() => {
    if (location) {
      const { ref } = qs.parse(location.search.slice(1));
      setToStorage(REFERRAL_CODE, ref);
    }
    if (typeof window !== undefined && refLink)
      setCookie(REFERRAL_CODE, refLink);
  }, [window, location]);
  return (
    <Layout title="Genesis Vision">
      <main className="home">
        <FirstScreen />
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
}
export const LandingPage = React.memo(_LandingPage);

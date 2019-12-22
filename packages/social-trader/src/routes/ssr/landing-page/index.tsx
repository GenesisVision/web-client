import "./styles/index.scss";
import "./styles/home.scss";

import { ItemsViewModelProgramDetailsListItem } from "gv-api-web";
import { NextPage } from "next";
import React from "react";
import BestList from "routes/ssr/landing-page/components/best/best-list";
import FirstSlider from "routes/ssr/landing-page/components/first-slider/first-slifer";
import StatList from "routes/ssr/landing-page/components/statistics/stat-list";
import ProgramsContainer from "routes/ssr/landing-page/containers/programs-container/programs-container";
import SocialContainer from "routes/ssr/landing-page/containers/social-container/social-container";
import TradersContainer from "routes/ssr/landing-page/containers/traders-container/traders-container";
import Layout from "routes/ssr/landing-page/layouts/_layout";
import { slides } from "routes/ssr/landing-page/static-data/slides";
import programsApi from "services/api-client/programs-api";
import { useTranslation } from "shared/i18n";

const IndexPage: NextPage<{
  programsData: ItemsViewModelProgramDetailsListItem;
}> = ({ programsData }) => {
  const programs = programsData.items;
  return (
    <Layout title="Genesis Vision">
      <main className="home">
        <section className="home__section home__section--first-screen">
          <div className="home__container">
            <FirstSlider className="home__grid-row" slidesItems={slides} />
            <div className="home__grid-row home__grid-row--mob-wider">
              <StatList className="home__grid-item" />
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
        <section className="home__section home__section--bg-gray home__section--horizontal-padding">
          <div className="home__container">
            <TradersContainer />
          </div>
        </section>
        <section className="home__section home__section--horizontal-padding">
          <div className="home__container">
            <ProgramsContainer />
          </div>
        </section>
        <section className="home__section home__section--bg-gray">
          <div className="home__container">
            <h2>Funds</h2>
          </div>
        </section>
        <section className="home__section home__section--bg-white">
          <div className="home__container">
            <h2>Tabs</h2>
          </div>
        </section>
        <section className="home__section home__section--bg-gray">
          <div className="home__container">
            <h2>Downloads</h2>
          </div>
        </section>
        <section className="home__section home__section--bg-white">
          <div className="home__container">
            <h2>Our Advantages</h2>
          </div>
        </section>
        <section className="home__section home__section--bg-gray">
          <div className="home__container">
            <h2>Brockers and trading conditions</h2>
            <p>Brockers and trading conditions</p>
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
    const programsData = await programsApi.getPrograms({
      skip: 0,
      take: 12
    });
    return { programsData };
  } catch (e) {
    const programsData = {
      total: 0,
      items: []
    };
    return { programsData };
  }
};

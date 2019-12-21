import "./styles/index.scss";
import "./styles/home.scss";

import { ItemsViewModelProgramDetailsListItem } from "gv-api-web";
import { NextPage } from "next";
import React from "react";
import FirstSlider from "routes/ssr/landing-page/components/first-slider/first-slifer";
import StatList from "routes/ssr/landing-page/components/statistics/stat-list";
import { slides } from "routes/ssr/landing-page/static-data/slides";
import programsApi from "services/api-client/programs-api";
import { useTranslation } from "shared/i18n";

import Layout from "./layouts/_layout";

const IndexPage: NextPage = () => {
  const { t } = useTranslation();
  // const title = t("funds-page.title");
  return (
    <Layout title="Genesis Vision">
      <main className="home">
        <section className="home__section home__section--first-screen">
          <div className="home__container">
            <FirstSlider className="home__grid-row" slidesItems={slides} />
            <div className="home__grid-row home__grid-row--mob-wide">
              <StatList className="home__grid-item" />
            </div>
          </div>
        </section>
        <section className="home__section home__section--bg-white">
          <div className="home__container">
            <h2>Our Best</h2>
          </div>
        </section>
        <section className="home__section home__section--bg-gray">
          <div className="home__container">
            <h2>Trades</h2>
          </div>
        </section>
        <section className="home__section">
          <div className="home__container">
            <h2>Programs</h2>
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
          </div>
        </section>
        <section className="home__section">
          <div className="home__container">
            <h2>Join the Genesis Vision Community</h2>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default IndexPage;

// IndexPage.getInitialProps = async () => {
//   try {
//     const programs = await programsApi.getPrograms({
//       skip: 0,
//       take: 12
//     });
//     return { programs };
//   } catch (e) {
//     const programs = {
//       total: 0,
//       items: []
//     };
//     return { programs };
//   }
// };

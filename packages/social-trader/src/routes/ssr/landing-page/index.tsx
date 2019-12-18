import "./styles/index.scss";

import { ItemsViewModelProgramDetailsListItem } from "gv-api-web";
import { NextPage } from "next";
import React from "react";
import programsApi from "services/api-client/programs-api";
import { useTranslation } from "shared/i18n";

import Layout from "./layouts/_layout";

const LandingIndexPage: NextPage<{
  programs: ItemsViewModelProgramDetailsListItem;
}> = ({ programs }) => {
  const { t } = useTranslation();
  // const title = t("funds-page.title");
  return (
    <Layout title="Genesis Vision">
      <main className="home">
        <section className="home__section home__section--first-screen">
          <div className="home__container">Landing Page</div>
        </section>
      </main>
    </Layout>
  );
};

export default LandingIndexPage;

LandingIndexPage.getInitialProps = async () => {
  try {
    const programs = await programsApi.getPrograms({
      skip: 0,
      take: 12
    });
    return { programs };
  } catch (e) {
    const programs = {
      total: 0,
      items: []
    };
    return { programs };
  }
};

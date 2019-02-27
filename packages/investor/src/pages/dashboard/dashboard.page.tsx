import "shared/components/dashboard/dashboard.scss";

import "./dashboard.scss";

import React from "react";
import { TranslationFunction, translate } from "react-i18next";
import Page from "shared/components/page/page";
import Surface from "shared/components/surface/surface";

import DashboardAssetsSection from "./components/dashboard-assets/dashboard-assets-section";
import DashboardChartSection from "./components/dashboard-portfolio-chart-section/dashboard-portfolio-chart-section";
import DashboardPortfolioEventsSection from "./components/dashboard-portfolio-events/dashboard-portfolio-events-section";
import DashboardTradesSection from "./components/dashboard-trades/dashboard-trades-section";

interface IDashboardPageProps {
  t: TranslationFunction;
}

const DashboardPage: React.FunctionComponent<IDashboardPageProps> = ({ t }) => {
  const title = t(`${process.env.REACT_APP_PLATFORM}.dashboard-page.title`);
  return (
    <Page title={title}>
      <div className="dashboard">
        <div className="dashboard__row">
          <div className="dashboard__chart">
            <Surface className="dashboard-portfolio-chart-section">
              <DashboardChartSection />
            </Surface>
          </div>
          <div className="dashboard__portfolio-events-aside">
            <DashboardPortfolioEventsSection title={title} />
          </div>
        </div>
        <div className="dashboard__table-section">
          <DashboardAssetsSection title={title} />
        </div>
        {/*<div className="dashboard__table-section">
          <DashboardTradesSection title={title} />
        </div>*/}
      </div>
    </Page>
  );
};

export default translate()(DashboardPage);

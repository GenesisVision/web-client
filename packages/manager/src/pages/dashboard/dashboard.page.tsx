import "shared/components/dashboard/dashboard.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import Page from "shared/components/page/page";
import { ROLE_ENV } from "shared/constants/constants";

import DashboardAssetsContainer from "./components/dashboard-assets/dashboard-assets-container";
import DashboardChartSection from "./components/dashboard-portfolio-chart-section/dashboard-portfolio-chart-section";
import DashboardPortfolioEventsSection from "./components/dashboard-portfolio-events/dashboard-portfolio-events-section";

const _DashboardPage: React.FC<InjectedTranslateProps> = ({ t }) => {
  const title = t(`${ROLE_ENV}.dashboard-page.title`);
  console.log("render");
  return (
    <Page title={title}>
      <div className="dashboard">
        <div className="dashboard__row">
          <div className="dashboard__chart">
            <DashboardChartSection />
          </div>
          <div className="dashboard__portfolio-events-aside">
            <DashboardPortfolioEventsSection title={title} />
          </div>
        </div>
        <div className="dashboard__assets">
          <DashboardAssetsContainer title={title} />
        </div>
      </div>
    </Page>
  );
};

const DashboardPage = React.memo(translate()(_DashboardPage));
export default DashboardPage;

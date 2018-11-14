import "./dashboard-portfolio-events-all.scss";

import Page from "shared/components/page/page";
import Surface from "shared/components/surface/surface";
import React from "react";
import { translate } from "react-i18next";

import { fetchPortfolioEvents } from "../../services/dashboard-events.services";
import PortfolioEventsTableComponent from "shared/components/dashboard/dashboard-portfolio-events-all/dashboard-portfolio-events-table/dashboard-portfolio-events-all-table";
export const PORTFOLIO_EVENTS_ALL_PAGE_ROUTE = "portfolio-events";
const PortfolioEventsAllComponent = ({ t }) => {
  return (
    <Page title={t("dashboard.portfolio-events.title")}>
      <div className="dashboard-portfolio-events-all">
        <h1 className="dashboard-portfolio-events-all__heading">
          {t("dashboard.portfolio-events.title")}
        </h1>
        <Surface>
          <PortfolioEventsTableComponent
            fetchPortfolioEvents={fetchPortfolioEvents}
            title={t("dashboard.portfolio-events.table-title")}
            className="portfolio-events-all-table"
            dateRangeStartLabel={t("filters.date-range.account-creation")}
          />
        </Surface>
      </div>
    </Page>
  );
};

export default translate()(PortfolioEventsAllComponent);

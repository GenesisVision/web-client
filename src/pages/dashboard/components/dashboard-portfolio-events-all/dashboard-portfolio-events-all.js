import "./dashboard-portfolio-events-all.scss";

import Page from "components/page/page";
import Surface from "components/surface/surface";
import React from "react";
import { translate } from "react-i18next";

import PortfolioEventsTableComponent from "./dashboard-portfolio-events-table/dashboard-portfolio-events-all-table";
import BackButton from "components/back-button/back-button";

export const PORTFOLIO_EVENTS_ALL_PAGE_ROUTE = "portfolio-events";
const PortfolioEventsAllComponent = ({ service, t }) => {
  return (
    <Page title={t("dashboard.portfolio-events.title")}>
      <div className="dashboard-portfolio-events-all">
        <BackButton />
        <h1 className="dashboard-portfolio-events-all__heading">
          {t("dashboard.portfolio-events.title")}
        </h1>
        <Surface>
          <PortfolioEventsTableComponent
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

import React from "react";
import { translate } from "react-i18next";

import { fetchPortfolioEvents } from "../../services/dashboard-events.services";
import PortfolioEventsTableComponent from "shared/components/dashboard/dashboard-portfolio-events-all/dashboard-portfolio-events-table/dashboard-portfolio-events-all-table";
export const PORTFOLIO_EVENTS_ALL_PAGE_ROUTE = "portfolio-events";
const PortfolioEventsAllComponent = ({ t }) => {
  return (
    <PortfolioEventsTableComponent
      fetchPortfolioEvents={fetchPortfolioEvents}
      pageTitle={t("dashboard.portfolio-events.title")}
      tableTitle={t("dashboard.portfolio-events.table-title")}
      className="portfolio-events-all-table"
      dateRangeStartLabel={t("filters.date-range.account-creation")}
    />
  );
};

export default translate()(PortfolioEventsAllComponent);

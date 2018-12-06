import React from "react";
import { translate } from "react-i18next";
import PortfolioEventsTableContainerComponent from "shared/components/dashboard/dashboard-portfolio-events-all/dashboard-portfolio-events-table/dashboard-portfolio-events-all-table-container";

import { fetchPortfolioEvents } from "../../services/dashboard-events.services";

export const PORTFOLIO_EVENTS_ALL_PAGE_ROUTE = "portfolio-events";
const PortfolioEventsAllComponent = ({ t }) => {
  return (
    <PortfolioEventsTableContainerComponent
      fetchPortfolioEvents={fetchPortfolioEvents}
      pageTitle={t(
        `${
          process.env.REACT_APP_PLATFORM
        }.dashboard-page.portfolio-events.title`
      )}
      tableTitle={t(
        `${
          process.env.REACT_APP_PLATFORM
        }.dashboard-page.portfolio-events.table-title`
      )}
      className="portfolio-events-all-table"
      dateRangeStartLabel={t("filters.date-range.account-creation")}
    />
  );
};

export default translate()(PortfolioEventsAllComponent);

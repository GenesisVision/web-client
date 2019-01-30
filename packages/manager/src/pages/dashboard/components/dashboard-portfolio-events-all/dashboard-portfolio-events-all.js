import React from "react";
import { translate } from "react-i18next";
import PortfolioEventsTableContainerComponent from "shared/components/portfolio-events-table/portfolio-events-table-container";
import { MANAGER_EVENT_TYPE_FILTER_VALUES } from "shared/components/table/components/filtering/event-type-filter/event-type-filter.constants";

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
      eventTypeFilterValues={MANAGER_EVENT_TYPE_FILTER_VALUES}
    />
  );
};

export default translate()(PortfolioEventsAllComponent);

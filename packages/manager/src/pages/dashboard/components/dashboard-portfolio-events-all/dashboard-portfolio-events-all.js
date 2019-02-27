import React from "react";
import { translate } from "react-i18next";
import PortfolioEventsTableContainerComponent from "shared/components/portfolio-events-table/portfolio-events-table-container";
import { MANAGER_EVENT_TYPE_FILTER_VALUES } from "shared/components/table/components/filtering/event-type-filter/event-type-filter.constants";
import Page from "shared/components/page/page";

import { fetchPortfolioEvents } from "../../services/dashboard-events.services";

export const PORTFOLIO_EVENTS_ALL_PAGE_ROUTE = "portfolio-events";
const PortfolioEventsAllComponent = ({ t }) => {
  const title = t(
    `${process.env.REACT_APP_PLATFORM}.dashboard-page.portfolio-events.title`
  );
  return (
    <Page title={title}>
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
    </Page>
  );
};

export default translate()(PortfolioEventsAllComponent);

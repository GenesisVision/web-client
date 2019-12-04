import Page from "components/page/page";
import PortfolioEventsTable from "components/portfolio-events-table/portfolio-events-table";
import Surface from "components/surface/surface";
import useRole from "hooks/use-role.hook";
import { EVENT_LOCATION } from "pages/programs/program-details/service/program-details.service";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { allEventsSelector } from "reducers/platform-reducer";

import { dashboardEventsAllTableSelector } from "../../reducers/dashboard-events.reducer";
import { getEvents } from "../../services/dashboard.service";

const _PortfolioEventsAllComponent: React.FC = () => {
  const [t] = useTranslation();
  const role = useRole();
  const events = useSelector(allEventsSelector);
  return (
    <Page
      title={t(
        `${role ? `${role}.` : ""}dashboard-page.portfolio-events.title`
      )}
    >
      <Surface className="dashboard-portfolio-events-all">
        <PortfolioEventsTable
          selector={dashboardEventsAllTableSelector}
          getItems={getEvents(EVENT_LOCATION.EventsAll)}
          eventLocation={EVENT_LOCATION.EventsAll}
          title={t(
            `${
              role ? `${role}.` : ""
            }dashboard-page.portfolio-events.table-title`
          )}
          className="portfolio-events-all-table"
          dateRangeStartLabel={t("filters.date-range.account-creation")}
          eventTypeFilterValues={events}
        />
      </Surface>
    </Page>
  );
};

const PortfolioEventsAllComponent = React.memo(_PortfolioEventsAllComponent);
export default PortfolioEventsAllComponent;

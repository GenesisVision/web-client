import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { InvestorRootState } from "reducers";
import { compose } from "redux";
import Page from "shared/components/page/page";
import PortfolioEventsTable from "shared/components/portfolio-events-table/portfolio-events-table";
import {
  EVENT_LOCATION,
  fetchPortfolioEvents
} from "shared/components/programs/program-details/services/program-details.service";
import Surface from "shared/components/surface/surface";
import useRole from "shared/hooks/use-role.hook";
import { allEventsSelector } from "shared/reducers/platform-reducer";

const _PortfolioEventsAllComponent: React.FC<Props> = ({ events }) => {
  const [t] = useTranslation();
  const role = useRole();
  return (
    <Page title={t(`${role}.dashboard-page.portfolio-events.title`)}>
      <Surface className="dashboard-portfolio-events-all">
        <PortfolioEventsTable
          fetchPortfolioEvents={fetchPortfolioEvents(EVENT_LOCATION.EventsAll)}
          title={t(`${role}.dashboard-page.portfolio-events.table-title`)}
          className="portfolio-events-all-table"
          dateRangeStartLabel={t("filters.date-range.account-creation")}
          eventTypeFilterValues={events}
        />
      </Surface>
    </Page>
  );
};

const mapStateToProps = (state: InvestorRootState): StateProps => ({
  events: allEventsSelector(state)
});

interface Props extends StateProps, OwnProps {}

interface OwnProps {}

interface StateProps {
  events: any[];
}

const PortfolioEventsAllComponent = compose<React.ComponentType<OwnProps>>(
  connect(mapStateToProps),
  React.memo
)(_PortfolioEventsAllComponent);
export default PortfolioEventsAllComponent;

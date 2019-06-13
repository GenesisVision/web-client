import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { ManagerRootState } from "reducers";
import { compose } from "redux";
import Page from "shared/components/page/page";
import PortfolioEventsTableContainerComponent from "shared/components/portfolio-events-table/portfolio-events-table-container";
import { fetchPortfolioEvents } from "shared/components/programs/program-details/services/program-details.service";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";
import withRole, { WithRoleProps } from "shared/decorators/with-role";
import { eventsSelector } from "shared/reducers/platform-reducer";

export const PORTFOLIO_EVENTS_ALL_PAGE_ROUTE = "portfolio-events";
const _PortfolioEventsAllComponent: React.FC<Props> = ({ role, t, events }) => (
  <Page title={t(`${role}.dashboard-page.portfolio-events.title`)}>
    <PortfolioEventsTableContainerComponent
      fetchPortfolioEvents={fetchPortfolioEvents}
      tableTitle={t(`${role}.dashboard-page.portfolio-events.table-title`)}
      className="portfolio-events-all-table"
      dateRangeStartLabel={t("filters.date-range.account-creation")}
      eventTypeFilterValues={events}
    />
  </Page>
);

const mapStateToProps = (state: ManagerRootState): StateProps => ({
  events: eventsSelector(state)
});

interface Props
  extends InjectedTranslateProps,
    StateProps,
    OwnProps,
    WithRoleProps {}

interface OwnProps {}

interface StateProps {
  events: SelectFilterValue<string>[];
}

const PortfolioEventsAllComponent = compose<React.ComponentType<OwnProps>>(
  withRole,
  translate(),
  connect(mapStateToProps),
  React.memo
)(_PortfolioEventsAllComponent);
export default PortfolioEventsAllComponent;

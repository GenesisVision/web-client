import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { ManagerRootState } from "reducers";
import { compose } from "redux";
import Page from "shared/components/page/page";
import PortfolioEventsTableContainerComponent from "shared/components/portfolio-events-table/portfolio-events-table-container";
import { fetchPortfolioEvents } from "shared/components/programs/program-details/services/program-details.service";
import { MANAGER_EVENT_TYPE_FILTER_VALUES } from "shared/components/table/components/filtering/event-type-filter/event-type-filter.constants";

const role = process.env.REACT_APP_PLATFORM;

export const PORTFOLIO_EVENTS_ALL_PAGE_ROUTE = "portfolio-events";
const _PortfolioEventsAllComponent: React.FC<Props> = ({ t }) => (
  <Page title={t(`${role}.dashboard-page.portfolio-events.title`)}>
    <PortfolioEventsTableContainerComponent
      fetchPortfolioEvents={fetchPortfolioEvents}
      tableTitle={t(`${role}.dashboard-page.portfolio-events.table-title`)}
      className="portfolio-events-all-table"
      dateRangeStartLabel={t("filters.date-range.account-creation")}
      eventTypeFilterValues={MANAGER_EVENT_TYPE_FILTER_VALUES}
    />
  </Page>
);

const mapStateToProps = (state: ManagerRootState): StateProps => {
  const {} = state;
  return { events: [] };
};

interface Props extends InjectedTranslateProps, StateProps {}

interface StateProps {
  events: any[];
}

const PortfolioEventsAllComponent = compose(
  React.memo,
  translate(),
  connect(mapStateToProps)
)(_PortfolioEventsAllComponent);
export default PortfolioEventsAllComponent;

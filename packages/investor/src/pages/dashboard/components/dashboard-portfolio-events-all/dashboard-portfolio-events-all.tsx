import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { InvestorRootState } from "reducers";
import { compose } from "redux";
import Page from "shared/components/page/page";
import PortfolioEventsTableContainer from "shared/components/portfolio-events-table/portfolio-events-table-container";
import { fetchPortfolioEvents } from "shared/components/programs/program-details/services/program-details.service";
import withRole, { WithRoleProps } from "shared/decorators/with-role";
import { getUnique } from "shared/utils/array";

export const PORTFOLIO_EVENTS_ALL_PAGE_ROUTE = "portfolio-events";
const _PortfolioEventsAllComponent: React.FC<Props> = ({ role, t, events }) => (
  <Page title={t(`${role}.dashboard-page.portfolio-events.title`)}>
    <PortfolioEventsTableContainer
      fetchPortfolioEvents={fetchPortfolioEvents}
      tableTitle={t(`${role}.dashboard-page.portfolio-events.table-title`)}
      className="portfolio-events-all-table"
      dateRangeStartLabel={t("filters.date-range.account-creation")}
      eventTypeFilterValues={events}
    />
  </Page>
);

const mapStateToProps = (state: InvestorRootState): StateProps => {
  if (!state.platformData.data) return { events: [] };
  const {
    funds,
    programs
  } = state.platformData.data.enums.program.investorNotificationType;
  const events = getUnique([...funds, ...programs]).map(event => ({
    value: event,
    labelKey: `investor.dashboard-page.portfolio-events.types.${event}`
  }));
  return { events };
};

interface Props
  extends InjectedTranslateProps,
    StateProps,
    OwnProps,
    WithRoleProps {}

interface OwnProps {}

interface StateProps {
  events: any[];
}

const PortfolioEventsAllComponent = compose<React.ComponentType<OwnProps>>(
  withRole,
  translate(),
  connect(mapStateToProps),
  React.memo
)(_PortfolioEventsAllComponent);
export default PortfolioEventsAllComponent;

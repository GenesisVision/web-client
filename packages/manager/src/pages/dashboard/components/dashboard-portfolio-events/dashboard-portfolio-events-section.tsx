import { InvestmentEventViewModels } from "gv-api-web";
import React from "react";
import { connect, ResolveThunks } from "react-redux";
import { ManagerRootState } from "reducers";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import DashboardPortfolioEvents from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-events";
import { DASHBOARD_EVENTS_ROUTE } from "shared/routes/dashboard.routes";

import { dashboardEventsSelector } from "../../reducers/dashboard-events.reducer";
import { getPortfolioEvents } from "../../services/dashboard.service";
import DashboardPortfolioEmptyView from "./dashboard-portfolio-empty-view";

class _DashboardPortfolioEventsSection extends React.PureComponent<Props> {
  componentDidMount() {
    const { service } = this.props;
    service.getPortfolioEvents();
  }
  render() {
    const { title, data } = this.props;
    return (
      <DashboardPortfolioEvents
        fullEventsUrl={DASHBOARD_EVENTS_ROUTE}
        title={title}
        data={data}
        emptyView={DashboardPortfolioEmptyView}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { getPortfolioEvents },
    dispatch
  )
});
const mapStateToProps = (state: ManagerRootState): StateProps => ({
  data: dashboardEventsSelector(state)
});

interface Props extends OwnProps, DispatchProps, StateProps {}

interface OwnProps {
  title: string;
}

interface StateProps {
  data?: InvestmentEventViewModels;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  getPortfolioEvents: typeof getPortfolioEvents;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

const DashboardPortfolioEventsSection = compose<React.ComponentType<OwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(_DashboardPortfolioEventsSection);
export default DashboardPortfolioEventsSection;

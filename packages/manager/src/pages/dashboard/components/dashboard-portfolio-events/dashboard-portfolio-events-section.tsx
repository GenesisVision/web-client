import { ManagerPortfolioEvents } from "gv-api-web";
import * as React from "react";
import { ResolveThunks, connect } from "react-redux";
import { ManagerRootState } from "reducers";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import DashboardPortfolioEvents from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-events";

import { DASHBOARD_EVENTS_ROUTE } from "../../dashboard.routes";
import { getPortfolioEvents } from "../../services/dashboard.service";
import DashboardPortfolioEmptyView from "./dashboard-portfolio-empty-view";
import DashboardPortfolioEvent from "./dashboard-portfolio-event/dashboard-portfolio-event";

class _DashboardPortfolioEventsSection extends React.PureComponent<Props> {
  componentDidMount() {
    const { service } = this.props;
    service.getPortfolioEvents();
  }
  render() {
    const { title, isPending, data } = this.props;
    return (
      <DashboardPortfolioEvents
        fullEventsUrl={DASHBOARD_EVENTS_ROUTE}
        title={title}
        isPending={isPending}
        data={data}
        eventView={DashboardPortfolioEvent}
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
const mapStateToProps = (state: ManagerRootState): StateProps => {
  const { isPending, data } = state.dashboard.eventsData;
  return { isPending, data };
};

interface Props extends OwnProps, DispatchProps, StateProps {}

interface OwnProps {
  title: string;
}

interface StateProps {
  isPending: boolean;
  data?: ManagerPortfolioEvents;
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

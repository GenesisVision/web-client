import { DashboardPortfolioEvents as DashboardPortfolioEventsType } from "gv-api-web";
import * as React from "react";
import { ResolveThunks, connect } from "react-redux";
import { InvestorRootState } from "reducers";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import DashboardPortfolioEvents from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-events";

import { DASHBOARD_EVENTS_ROUTE } from "../../dashboard.routes";
import { getTopPortfolioEvents } from "../../services/dashboard-events.services";
import DashboardPortfolioEvent from "./dashboard-portfolio-event/dashboard-portfolio-event";

class DashboardPortfolioEventsSection extends React.PureComponent<Props> {
  componentDidMount() {
    const { service } = this.props;
    service.getTopPortfolioEvents();
  }
  render() {
    const { title, isPending, data } = this.props;
    return (
      <DashboardPortfolioEvents
        condition={!!data}
        fullEventsUrl={DASHBOARD_EVENTS_ROUTE}
        title={title}
        isPending={isPending}
        data={data!}
        eventView={({ event }) => <DashboardPortfolioEvent event={event} />}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { getTopPortfolioEvents },
    dispatch
  )
});
const mapStateToProps = (state: InvestorRootState): StateProps => {
  const { isPending, data } = state.dashboard.eventsData;
  return { isPending, data };
};

interface Props extends StateProps, DispatchProps, OwnProps {}

interface OwnProps {
  title: string;
}

interface StateProps {
  isPending: boolean;
  data?: DashboardPortfolioEventsType;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  getTopPortfolioEvents: typeof getTopPortfolioEvents;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

export default compose<React.ComponentType<OwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DashboardPortfolioEventsSection);

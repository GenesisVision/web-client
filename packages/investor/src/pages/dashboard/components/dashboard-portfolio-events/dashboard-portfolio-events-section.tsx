import { InvestmentEventViewModels } from "gv-api-web";
import React from "react";
import { connect, ResolveThunks } from "react-redux";
import { InvestorRootState } from "reducers";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import DashboardPortfolioEvents from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-events";
import { DASHBOARD_EVENTS_ROUTE } from "shared/routes/dashboard.routes";

import { dashboardEventsSelector } from "../../reducers/dashboard-events.reducer";
import { getTopPortfolioEvents } from "../../services/dashboard-events.services";

class DashboardPortfolioEventsSection extends React.PureComponent<Props> {
  componentDidMount() {
    const { service } = this.props;
    service.getTopPortfolioEvents();
  }
  render() {
    const { title, data } = this.props;
    return (
      <DashboardPortfolioEvents
        fullEventsUrl={DASHBOARD_EVENTS_ROUTE}
        title={title}
        data={data}
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
const mapStateToProps = (state: InvestorRootState): StateProps => ({
  data: dashboardEventsSelector(state)
});

interface Props extends StateProps, DispatchProps, OwnProps {}

interface OwnProps {
  title: string;
}

interface StateProps {
  data?: InvestmentEventViewModels;
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

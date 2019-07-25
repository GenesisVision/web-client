import { DashboardPortfolioEvents as DashboardPortfolioEventsType } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { InvestorRootState } from "reducers";
import DashboardPortfolioEvents from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-events";
import { DASHBOARD_EVENTS_ROUTE } from "shared/routes/dashboard.routes";

import { dashboardEventsSelector } from "../../reducers/dashboard-events.reducer";
import DashboardPortfolioEvent from "./dashboard-portfolio-event/dashboard-portfolio-event";

class DashboardPortfolioEventsSection extends React.PureComponent<Props> {
  render() {
    const { title, data } = this.props;
    return (
      <DashboardPortfolioEvents
        fullEventsUrl={DASHBOARD_EVENTS_ROUTE}
        title={title}
        data={data}
        eventView={DashboardPortfolioEvent}
      />
    );
  }
}

const mapStateToProps = (state: InvestorRootState): StateProps => ({
  data: dashboardEventsSelector(state)
});

interface Props extends StateProps, OwnProps {}

interface OwnProps {
  title: string;
}

interface StateProps {
  data?: DashboardPortfolioEventsType;
}

export default connect(mapStateToProps)(DashboardPortfolioEventsSection);

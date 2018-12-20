import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "redux";
import DashboardPortfolioEvents from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-events";

import { DASHBOARD_EVENTS_ROUTE } from "../../dashboard.routes";
import { getTopPortfolioEvents } from "../../services/dashboard-events.services";
import DashboardPortfolioEvent from "./dashboard-portfolio-event/dashboard-portfolio-event";

class DashboardPortfolioEventsSection extends Component {
  componentDidMount() {
    const { service } = this.props;
    service.getTopPortfolioEvents();
  }
  render() {
    const { title, isPending, data } = this.props;
    return (
      <DashboardPortfolioEvents
        fullEventsUrl={DASHBOARD_EVENTS_ROUTE}
        title={title}
        isPending={isPending}
        data={data}
        eventView={({ event }) => <DashboardPortfolioEvent event={event} />}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ getTopPortfolioEvents }, dispatch)
});
const mapStateToProps = state => {
  const { isPending, data } = state.dashboard.eventsData;
  return { isPending, data };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DashboardPortfolioEventsSection);

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { DASHBOARD_EVENTS_ROUTE } from "../../dashboard.routes";
import { getPortfolioEvents } from "../../services/dashboard.service";
import DashboardPortfolioEvents from "./dashboard-portfolio-events";

class DashboardPortfolioEventsContainer extends Component {
  componentDidMount() {
    const { service } = this.props;
    service.getPortfolioEvents();
  }

  render() {
    const { events } = this.props;

    if (!events) return null;

    return (
      <DashboardPortfolioEvents
        events={events}
        fullEventsUrl={DASHBOARD_EVENTS_ROUTE}
      />
    );
  }
}

const mapStateToProps = state => {
  const { data } = state.dashboardData.dashboardEvents;
  return { events: data ? data.events : null };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ getPortfolioEvents }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPortfolioEventsContainer);

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { DASHBOARD_EVENTS_FULL_ROUTE } from "../../dashboard.routes";
import { getPortfolioEvents } from "../../services/dashboard.service";
import DashboardPortfolioEvents from "./dashboard-portfolio-events";

class DashboardPortfolioEventsContainer extends Component {
  componentDidMount() {
    const { service } = this.props;
    service.getPortfolioEvents();
  }

  render() {
    const { isPending, events } = this.props;

    if (!events) return null;

    return (
      <DashboardPortfolioEvents
        events={events}
        urlToRedirect={DASHBOARD_EVENTS_FULL_ROUTE}
      />
    );
  }
}

const mapStateToProps = state => {
  const { isPending, data } = state.dashboardData.dashboardEvents;
  return { isPending, events: data ? data.events : null };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ getPortfolioEvents }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPortfolioEventsContainer);

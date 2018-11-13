import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "redux";

import { DASHBOARD_EVENTS_ROUTE } from "../../dashboard.routes";
import { getPortfolioEvents } from "../../services/dashboard.service";
import DashboardPortfolioEventsContainer from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-events-container";

class DashboardPortfolioEventsSection extends Component {
  componentDidMount() {
    const { service } = this.props;
    service.getPortfolioEvents();
  }
  render() {
    const { title, isPending, data } = this.props;
    return (
      <DashboardPortfolioEventsContainer
        fullEventsUrl={DASHBOARD_EVENTS_ROUTE}
        title={title}
        isPending={isPending}
        data={data}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ getPortfolioEvents }, dispatch)
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

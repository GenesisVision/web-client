import Surface from "components/surface/surface";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "redux";

import { DASHBOARD_EVENTS_ROUTE } from "../../dashboard.routes";
import { getPortfolioEvents } from "../../services/dashboard.service";
import DashboardPortfolioEvents from "./dashboard-portfolio-events";

class DashboardPortfolioEventsContainer extends Component {
  componentDidMount() {
    const { service } = this.props;
    service.getPortfolioEvents();
  }

  renderEvents = () => {
    const { isPending, data } = this.props;
    if (isPending || data === undefined) return null;
    debugger;
    return (
      <DashboardPortfolioEvents
        events={data.events}
        fullEventsUrl={DASHBOARD_EVENTS_ROUTE}
      />
    );
  };
  render() {
    const { t } = this.props;

    return (
      <Surface className="dashboard-portfolio-events">
        <h2 className="dashboard-portfolio-events__title">
          {t("dashboard.portfolio-events.title")}
        </h2>
        {this.renderEvents()}
      </Surface>
    );
  }
}

const mapStateToProps = state => {
  const { isPending, data } = state.dashboard.eventsData;
  return { isPending, data };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ getPortfolioEvents }, dispatch)
});

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DashboardPortfolioEventsContainer);

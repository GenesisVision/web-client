import "./dashboard-portfolio-events.scss";

import { GVButton } from "gv-react-components";
import * as PropTypes from "prop-types";
import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import Surface from "shared/components/surface/surface";

import DashboardPortfolioEmptyView from "./dashboard-portfolio-empty-view";
import DashboardPortfolioEventsLoader from "./dashboard-portfolio-event-loader/dashboard-portfolio-event-list-loader";

class DashboardPortfolioEvents extends Component {
  renderEvents = () => {
    const {
      isPending,
      data,
      manager,
      eventView: DashboardPortfolioEvent
    } = this.props;
    if (isPending && !data) return <DashboardPortfolioEventsLoader />;
    if (data === undefined) return null;
    return (
      (data.total &&
        data.events.map((event, idx) => (
          <DashboardPortfolioEvent event={event} key={idx} />
        ))) ||
      (manager && <DashboardPortfolioEmptyView />) ||
      null
    );
  };
  render() {
    const { t, fullEventsUrl, title } = this.props;

    return (
      <Surface className="dashboard-portfolio-events">
        <h3 className="dashboard-portfolio-events__title">
          {t("dashboard.portfolio-events.title")}
        </h3>
        <div className="dashboard-portfolio-events__scroll-container">
          <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHeight
            autoHeightMax="541px"
          >
            <div className="dashboard-portfolio-events__list">
              {this.renderEvents()}
            </div>
          </Scrollbars>
        </div>

        <Link
          className="dashboard-portfolio-events__see-all"
          to={{
            pathname: fullEventsUrl,
            state: `/ ${title}`
          }}
        >
          <GVButton variant="text" color="secondary">
            {t("dashboard.portfolio-events.see-all-button")} &#8250;
          </GVButton>
        </Link>
      </Surface>
    );
  }
}

DashboardPortfolioEvents.propTypes = {
  eventView: PropTypes.node.isRequired
};

export default compose(translate())(DashboardPortfolioEvents);

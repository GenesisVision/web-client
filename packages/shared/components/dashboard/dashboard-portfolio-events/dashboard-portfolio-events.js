import "./dashboard-portfolio-events.scss";

import { GVButton } from "gv-react-components";
import * as PropTypes from "prop-types";
import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import Surface from "shared/components/surface/surface";

import DashboardPortfolioEventsListLoader from "./dashboard-portfolio-event-loader/dashboard-portfolio-event-list-loader";

class DashboardPortfolioEvents extends Component {
  renderEvents = () => {
    const {
      isPending,
      data,
      eventView: DashboardPortfolioEvent,
      emptyView: DashboardPortfolioEmptyView
    } = this.props;
    if (isPending && !data) return <DashboardPortfolioEventsListLoader />;
    if (data === undefined) return null;
    return (
      (data.total &&
        data.events.map((event, idx) => (
          <DashboardPortfolioEvent event={event} key={idx} />
        ))) ||
      (DashboardPortfolioEmptyView ? <DashboardPortfolioEmptyView /> : null)
    );
  };
  render() {
    const { t, fullEventsUrl, title } = this.props;

    return (
      <Surface className="surface--horizontal-paddings dashboard-portfolio-events">
        <h3>
          {t(
            `${
              process.env.REACT_APP_PLATFORM
            }.dashboard-page.portfolio-events.title`
          )}
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
            {t(
              `${
                process.env.REACT_APP_PLATFORM
              }.dashboard-page.portfolio-events.see-all-button`
            )}{" "}
            &#8250;
          </GVButton>
        </Link>
      </Surface>
    );
  }
}

DashboardPortfolioEvents.propTypes = {
  eventView: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
};

export default compose(translate())(DashboardPortfolioEvents);

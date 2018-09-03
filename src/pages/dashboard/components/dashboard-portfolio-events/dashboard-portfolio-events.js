import "./dashboard-portfolio-events.scss";

import { GVButton } from "gv-react-components";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

import DashboardPortfolioEvent, {
  DashboardPortfolioEventShape
} from "./dashboard-portfolio-event/dashboard-portfolio-event";

const DashboardPortfolioEvents = ({ t, events, fullEventsUrl }) => (
  <Fragment>
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      style={{ width: "265px", height: "541px", paddingRight: "10px" }}
      className="dashboard-portfolio-events__scroll-container"
    >
      <div className="dashboard-portfolio-events__list">
        {events.map(event => (
          <DashboardPortfolioEvent event={event} key={event.date} />
        ))}
      </div>
    </Scrollbars>
    <Link to={fullEventsUrl} className="dashboard-portfolio-events__see-all">
      <GVButton variant="text" color="secondary">
        {t("dashboard.portfolio-events.see-all-button")}
      </GVButton>
    </Link>
  </Fragment>
);

DashboardPortfolioEvents.propTypes = {
  events: PropTypes.arrayOf(DashboardPortfolioEventShape).isRequired,
  fullEventsUrl: PropTypes.string.isRequired
};

export default translate()(DashboardPortfolioEvents);

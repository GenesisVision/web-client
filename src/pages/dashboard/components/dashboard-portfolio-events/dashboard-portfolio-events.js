import "./dashboard-portfolio-events.scss";

import Surface from "components/surface/surface";
import { GVButton } from "gv-react-components";
import PropTypes from "prop-types";
import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

import DashboardPortfolioEvent from "./dashboard-portfolio-event/dashboard-portfolio-event";

const DashboardPortfolioEvents = ({ t, events, urlToRedirect }) => (
  <Surface className="dashboard-portfolio-events">
    <h2 className="dashboard-portfolio-events__title">Portfolio Events</h2>
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      style={{ width: "100%", height: "583px" }}
      className="dashboard-portfolio-events__scroll-container"
    >
      {events.map(event => (
        <DashboardPortfolioEvent event={event} key={event.date} />
      ))}
    </Scrollbars>
    <Link to={urlToRedirect} className="dashboard-portfolio-events__see-all">
      <GVButton variant="text" color="secondary">
        {t("dashboard.portfolio-events.see-all-button")}
      </GVButton>
    </Link>
  </Surface>
);

DashboardPortfolioEvents.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired
    })
  ).isRequired,
  urlToRedirect: PropTypes.string.isRequired
};

export default translate()(DashboardPortfolioEvents);

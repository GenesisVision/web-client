import "./dashboard-portfolio-events.scss";

import Surface from "components/surface/surface";
import { GVButton } from "gv-react-components";
import PropTypes from "prop-types";
import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

import DashboardPortfolioEvent from "./dashboard-portfolio-event/dashboard-portfolio-event";

const DashboardPortfolioEvents = ({ t, events, fullEventsUrl }) => (
  <Surface className="dashboard-portfolio-events">
    <h2 className="dashboard-portfolio-events__title">
      {t("dashboard.portfolio-events.title")}
    </h2>
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      style={{ width: "265px", height: "541px", paddingRight: "10px" }}
      renderThumbVertical={props => (
        <div
          {...props}
          className="dashboard-portfolio-events__thumb-vertical"
        />
      )}
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
  </Surface>
);

DashboardPortfolioEvents.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      description: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      logo: PropTypes.string
    })
  ).isRequired,
  fullEventsUrl: PropTypes.string.isRequired
};

export default translate()(DashboardPortfolioEvents);

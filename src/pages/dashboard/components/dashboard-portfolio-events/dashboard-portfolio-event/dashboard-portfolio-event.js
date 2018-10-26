import "./dashboard-portfolio-event.scss";

import Profitability from "components/profitability/profitability";
import * as moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import NumberFormat from "react-number-format";
import { formatValue, roundTypeEnum } from "utils/formatter";

import PortfolioEventLogo from "../dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import { composeEventLogoType } from "../dashboard-portfolio-event-logo/dashboard-portfolio-event-logo.helper";

const formatDate = date => {
  const now = moment(new Date());
  const eventCreationDate = moment(date);

  const dayDifference = moment(now).diff(eventCreationDate, "days");
  const isShowFullDate = dayDifference > 1;

  if (isShowFullDate) return eventCreationDate.format("DD MMM YYYY, HH:MM a");

  return eventCreationDate.fromNow();
};

const DashboardPortfolioEvent = ({ event }) => {
  return (
    <div className="portfolio-event">
      <PortfolioEventLogo
        type={composeEventLogoType(event.type)}
        logo={event.logo}
        color={event.color}
      />
      <div className="portfolio-event__info">
        <span className="portfolio-event__time">{formatDate(event.date)}</span>
        <div className="portfolio-event__values-container">
          <div className="portfolio-event__description">
            {event.description}
          </div>
          <span className="portfolio-event__value">
            <Profitability value={formatValue(event.value)} prefix="sign">
              <NumberFormat
                value={formatValue(event.value, roundTypeEnum.FLOOR, false)}
                displayType="text"
                suffix={` ${event.currency}`}
              />
            </Profitability>
          </span>
        </div>
      </div>
    </div>
  );
};

export const DashboardPortfolioEventShape = PropTypes.shape({
  date: PropTypes.instanceOf(Date).isRequired,
  description: PropTypes.string,
  value: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  logo: PropTypes.string
});

DashboardPortfolioEvent.propTypes = {
  event: DashboardPortfolioEventShape
};

export default DashboardPortfolioEvent;

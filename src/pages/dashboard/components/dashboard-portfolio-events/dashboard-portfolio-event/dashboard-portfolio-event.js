import "./dashboard-portfolio-event.scss";

import classnames from "classnames";
import Profitability from "components/profitability/profitability";
import * as moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import NumberFormat from "react-number-format";

import PortfolioEventLogo, {
  logoTypes
} from "../dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";

const formatDate = date => {
  const now = moment(new Date());
  const eventCreationDate = moment(date);

  const dayDifference = moment(now).diff(eventCreationDate, "days");
  const isShowFullDate = dayDifference > 1;

  if (isShowFullDate) return eventCreationDate.format("DD MMM YYYY, HH:MM a");

  return eventCreationDate.fromNow();
};

const DashboardPortfolioEvent = ({ event }) => {
  const isPositive = event.value > 0;
  const isNegative = event.value < 0;

  const className = classnames("portfolio-event", {
    "portfolio-event--positive": isPositive,
    "portfolio-event--negative": isNegative
  });

  return (
    <div className={className}>
      <PortfolioEventLogo
        isPositive={isPositive}
        type={isPositive ? logoTypes.PROFIT : logoTypes.LOSE}
        logo={event.logo}
      />
      <div className="portfolio-event__info">
        <span className="portfolio-event__time">{formatDate(event.date)}</span>
        <p className="portfolio-event__description">{event.description}</p>
        <span className="portfolio-event__value">
          <Profitability value={event.value}>
            <NumberFormat
              value={Math.abs(event.value)}
              decimalScale={8}
              displayType="text"
              suffix=" GVT"
            />
          </Profitability>
        </span>
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

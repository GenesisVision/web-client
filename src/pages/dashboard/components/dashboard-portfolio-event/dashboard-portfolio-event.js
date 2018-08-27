import "./dashboard-portfolio-event.scss";

import classnames from "classnames";
import * as moment from "moment";
import React from "react";

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
      />
      <div className="portfolio-event__info">
        <span className="portfolio-event__time">{formatDate(event.date)}</span>
        <p className="portfolio-event__description">{event.description}</p>
        <span className="portfolio-event__value">
          {isPositive && "+"} {isNegative && "-"} {Math.abs(event.value) + " "}
          GVT
        </span>
      </div>
    </div>
  );
};

export default DashboardPortfolioEvent;

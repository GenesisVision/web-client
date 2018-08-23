import "./dashboard-portfolio-event.scss";

import classnames from "classnames";
import * as moment from "moment";
import React from "react";

const formatDate = date => {
  const now = moment(new Date());
  const eventCreationDate = moment(date);

  const dayDifference = moment(now).diff(eventCreationDate, "days");
  const isShowFullDate = dayDifference > 1;

  if (isShowFullDate) return eventCreationDate.format("DD MMM YYYY, HH:MM a");

  return eventCreationDate.fromNow();
};

const DashboardPortfolioEvent = eventModel => {
  const isPositive = eventModel.value > 0;
  const isNegative = eventModel.value < 0;

  const className = classnames("portfolio-event", {
    "portfolio-event--positive": isPositive,
    "portfolio-event--negative": isNegative
  });

  return (
    <div className={className} key={eventModel.date}>
      <div className="portfolio-event__art">
        <div className="portfolio-event__logo-photo">P</div>
        <div className="portfolio-event__logo-type">T</div>
      </div>
      <div className="portfolio-event__info">
        <span className="portfolio-event__time">
          {formatDate(eventModel.date)}
        </span>
        <p className="portfolio-event__description">{eventModel.description}</p>
        <span className="portfolio-event__value">
          {isPositive && "+"} {isNegative && "-"}{" "}
          {Math.abs(eventModel.value) + " "}
          GVT
        </span>
      </div>
    </div>
  );
};

export default DashboardPortfolioEvent;

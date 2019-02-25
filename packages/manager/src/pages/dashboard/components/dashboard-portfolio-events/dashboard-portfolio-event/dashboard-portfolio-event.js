import "./dashboard-portfolio-event.scss";

import * as moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import PortfolioEventLogo from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import Profitability from "shared/components/profitability/profitability";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatCurrencyValue } from "shared/utils/formatter";

import {
  isUseProfitability,
  valueDescriptionLocalizationConstant
} from "../../helpers/dashboard-portfolio.helpers";

const formatDate = date => {
  const now = moment(new Date());
  const eventCreationDate = moment(date);

  const dayDifference = moment(now).diff(eventCreationDate, "days");
  const isShowFullDate = dayDifference > 1;

  return isShowFullDate
    ? eventCreationDate.format("DD MMM YYYY, HH:MM a")
    : eventCreationDate.fromNow();
};

const DashboardPortfolioEvent = ({ t, event }) => {
  const valueDescription = valueDescriptionLocalizationConstant(event);
  const renderValueDescription = () => (
    <div className="portfolio-event__value">
      {isUseProfitability(event) ? (
        <Profitability value={event.value} prefix="sign">
          <NumberFormat
            value={formatCurrencyValue(event.value, event.currency, true)}
            displayType="text"
            allowNegative={false}
            suffix={` ${event.currency}`}
          />
        </Profitability>
      ) : (
        <NumberFormat
          value={formatCurrencyValue(event.value, event.currency)}
          displayType="text"
          suffix={` ${event.currency}`}
        />
      )}
    </div>
  );
  return (
    <div className="portfolio-event">
      <PortfolioEventLogo
        type={event.type}
        logo={event.logo}
        color={event.color}
      />
      <div className="portfolio-event__info">
        <StatisticItem label={formatDate(event.date)} small>
          <div className="portfolio-event__values-container">
            {event.description}
          </div>
          <StatisticItem
            label={t(valueDescription)}
            small
            className="portfolio-event__values-container"
          >
            {renderValueDescription()}
          </StatisticItem>
        </StatisticItem>
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

export default translate()(DashboardPortfolioEvent);

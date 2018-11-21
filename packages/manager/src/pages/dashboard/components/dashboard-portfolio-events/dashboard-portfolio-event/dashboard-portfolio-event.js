import "./dashboard-portfolio-event.scss";

import * as moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import PortfolioEventLogo from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import Profitability from "shared/components/profitability/profitability";
import { formatValue } from "shared/utils/formatter";

import {
  isUseProfitability,
  valueDescriptionLocalizationConstant
} from "../../helpers/dashboard-portfolio.helpers";
import DetailsStatisticItem from "shared/components/details-statistic-item/details-statistic-item";

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
            value={formatValue(event.value)}
            displayType="text"
            allowNegative={false}
            suffix={` ${event.currency}`}
          />
        </Profitability>
      ) : (
        <NumberFormat
          value={formatValue(event.value)}
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
        <DetailsStatisticItem label={formatDate(event.date)} small>
          <div className="portfolio-event__values-container">
            {event.description}
          </div>
          <DetailsStatisticItem label={t(valueDescription)} small>
            {renderValueDescription()}
          </DetailsStatisticItem>
        </DetailsStatisticItem>
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

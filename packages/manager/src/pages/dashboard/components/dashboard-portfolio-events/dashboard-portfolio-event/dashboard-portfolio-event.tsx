import "./dashboard-portfolio-event.scss";

import moment from "moment";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import PortfolioEventLogo from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import Profitability from "shared/components/profitability/profitability";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatCurrencyValue } from "shared/utils/formatter";

import {
  isUseProfitability,
  valueDescriptionLocalizationConstant
} from "../../helpers/dashboard-portfolio.helpers";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import { ManagerPortfolioEvent } from "gv-api-web";
import { EVENT_LOGO_TYPE } from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo.helper";

const formatDate = (date: Date) => {
  const now = moment(new Date());
  const eventCreationDate = moment(date);

  const dayDifference = moment(now).diff(eventCreationDate, "days");
  const isShowFullDate = dayDifference > 1;

  return isShowFullDate
    ? eventCreationDate.format()
    : eventCreationDate.fromNow();
};

const ValueDescription: React.FC<{ event: ManagerPortfolioEvent }> = React.memo(
  ({ event }) => (
    <div className="portfolio-event__value">
      {isUseProfitability(event.type as EVENT_LOGO_TYPE) ? (
        <Profitability
          value={String(event.value)}
          prefix={PROFITABILITY_PREFIX.SIGN}
        >
          <NumberFormat
            value={formatCurrencyValue(event.value, event.currency)}
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
  )
);

const _DashboardPortfolioEvent: React.FC<
  { event: ManagerPortfolioEvent } & InjectedTranslateProps
> = ({ t, event }) => (
  <div className="portfolio-event">
    <PortfolioEventLogo
      type={event.type as EVENT_LOGO_TYPE}
      logo={event.logo}
      color={event.color}
      url={event.url}
      assetType={event.programType}
    />
    <div className="portfolio-event__info">
      <StatisticItem label={formatDate(event.date)} small>
        <div className="portfolio-event__values-container">
          {event.description}
        </div>
        <StatisticItem
          label={t(
            valueDescriptionLocalizationConstant(event.type as EVENT_LOGO_TYPE)
          )}
          small
          className="portfolio-event__values-container"
        >
          <ValueDescription event={event} />
        </StatisticItem>
      </StatisticItem>
    </div>
  </div>
);

const DashboardPortfolioEvent = React.memo(
  translate()(_DashboardPortfolioEvent)
);
export default DashboardPortfolioEvent;

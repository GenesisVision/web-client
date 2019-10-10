import "./dashboard-portfolio-event.scss";

import { InvestmentEventViewModel } from "gv-api-web";
import React from "react";
import NumberFormat from "react-number-format";
import PortfolioEventLogo from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import { EVENT_PROFITABILITY_VALUES } from "shared/components/portfolio-events-table/portfolio-events-table.constants";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { distanceDate } from "shared/utils/dates";
import { formatCurrencyValue } from "shared/utils/formatter";

const _DashboardPortfolioEvent: React.FC<Props> = ({ event, from }) => (
  <div className="portfolio-event">
    {event.assetDetails && (
      <PortfolioEventLogo
        assetDetails={event.assetDetails}
        icon={event.icon}
        from={from}
      />
    )}
    <div className="portfolio-event__info">
      <StatisticItem
        label={distanceDate(new Date(event.date), undefined, true)}
      >
        <div className="portfolio-event__values-container">
          <div className="portfolio-event__description">{event.title}</div>
        </div>
        {!!event.amount && (
          <div className="portfolio-event__value">
            <Profitability
              value={EVENT_PROFITABILITY_VALUES[event.changeState]}
              prefix={PROFITABILITY_PREFIX.SIGN}
            >
              <NumberFormat
                value={formatCurrencyValue(event.amount, event.currency)}
                allowNegative={false}
                thousandSeparator=" "
                displayType="text"
                suffix={" " + event.currency}
              />
            </Profitability>
          </div>
        )}
        {event.extendedInfo.length > 0 && (
          <div className="portfolio-event__profit-info">
            {event.extendedInfo.map((info, index) => (
              <StatisticItem key={index} label={info.title} accent>
                <NumberFormat
                  value={formatCurrencyValue(info.amount, info.currency)}
                  displayType="text"
                  suffix={` ${info.currency}`}
                />
              </StatisticItem>
            ))}
          </div>
        )}
        {event.feesInfo.length > 0 && (
          <div className="portfolio-event__profit-info">
            {event.feesInfo.map((fee, index) => (
              <StatisticItem key={index} label={fee.title}>
                <NumberFormat
                  value={formatCurrencyValue(fee.amount, fee.currency)}
                  displayType="text"
                  suffix={` ${fee.currency}`}
                />
              </StatisticItem>
            ))}
          </div>
        )}
      </StatisticItem>
    </div>
  </div>
);

const DashboardPortfolioEvent = React.memo(_DashboardPortfolioEvent);
export default DashboardPortfolioEvent;

interface Props {
  event: InvestmentEventViewModel;
  from: string;
}

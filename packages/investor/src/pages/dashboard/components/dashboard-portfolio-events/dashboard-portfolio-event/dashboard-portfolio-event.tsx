import "./dashboard-portfolio-event.scss";

import { DashboardPortfolioEvent as DashboardPortfolioEventType } from "gv-api-web";
import moment from "moment";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import PortfolioEventLogo from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import { EVENT_LOGO_TYPE } from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo.helper";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { PROFIT_EVENT } from "shared/constants/constants";
import { formatCurrencyValue } from "shared/utils/formatter";

import { isUseProfitability } from "../../helpers/dashboard-portfolio.helpers";

const formatDate = (date: Date) => {
  const now = moment(new Date());
  const eventCreationDate = moment(date);
  const dayDifference = moment(now).diff(eventCreationDate, "days");
  const isShowFullDate = dayDifference > 1;
  if (isShowFullDate) return eventCreationDate.format();
  return eventCreationDate.fromNow();
};

const _EventDescription: React.FC<
  { event: DashboardPortfolioEventType } & InjectedTranslateProps
> = ({ t, event }) => {
  const valueTotal =
    event.type === PROFIT_EVENT ? event.valueTotal : event.value;
  return (
    <>
      <div className="portfolio-event__values-container">
        <div className="portfolio-event__description">{event.description}</div>
        <span className="portfolio-event__value">
          {isUseProfitability(event.type) ? (
            <Profitability
              value={String(valueTotal)}
              prefix={PROFITABILITY_PREFIX.SIGN}
            >
              <NumberFormat
                value={formatCurrencyValue(valueTotal, event.currency)}
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
        </span>
      </div>
      {event.type === PROFIT_EVENT && (
        <div className="portfolio-event__profit-info">
          <StatisticItem
            label={t(`investor.dashboard-page.portfolio-events.success-fee`)}
            accent
          >
            <NumberFormat
              value={formatCurrencyValue(
                event.feeSuccessManager,
                event.feeSuccessManagerCurrency
              )}
              displayType="text"
              suffix={` ${event.feeSuccessManagerCurrency || ""}`}
            />
          </StatisticItem>
          <StatisticItem
            label={t(`investor.dashboard-page.portfolio-events.gv-commission`)}
            accent
          >
            <NumberFormat
              value={formatCurrencyValue(
                event.feeSuccessPlatform,
                event.feeSuccessPlatformCurrency
              )}
              displayType="text"
              suffix={` ${event.feeSuccessPlatformCurrency || ""}`}
            />
          </StatisticItem>
          <StatisticItem
            label={t(`investor.dashboard-page.portfolio-events.you-ve-earned`)}
            accent
          >
            <Profitability value={String(event.value)}>
              <NumberFormat
                value={formatCurrencyValue(event.value, event.currency)}
                displayType="text"
                allowNegative={false}
                suffix={` ${event.currency}`}
              />
            </Profitability>
          </StatisticItem>
        </div>
      )}
    </>
  );
};
const EventDescription = React.memo(translate()(_EventDescription));

const _DashboardPortfolioEvent: React.FC<{
  event: DashboardPortfolioEventType;
}> = ({ event }) => (
  <div className="portfolio-event">
    <PortfolioEventLogo
      type={event.type as EVENT_LOGO_TYPE}
      logo={event.logo}
      color={event.color}
      url={event.url}
      assetType={event.assetType}
    />
    <div className="portfolio-event__info">
      <StatisticItem label={formatDate(event.date)}>
        <EventDescription event={event} />
      </StatisticItem>
    </div>
  </div>
);

const DashboardPortfolioEvent = React.memo(_DashboardPortfolioEvent);
export default DashboardPortfolioEvent;

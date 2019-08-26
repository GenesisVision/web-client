import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { EVENT_LOGO_TYPE } from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo.helper";
import withRole, { WithRoleProps } from "shared/decorators/with-role";
import EventCancelledIconRed from "shared/media/event-cancelled-red.svg";
import EventCancelledIcon from "shared/media/event-cancelled.svg";
import EventEndedRedIcon from "shared/media/event-ended-red.svg";
import EventLossIconRed from "shared/media/event-loss-red.svg";
import EventProfitIconGreen from "shared/media/event-profit-green.svg";
import EventStartedIcon from "shared/media/event-started.svg";

export const EvenLogoIcon: React.FC<{ type: EVENT_LOGO_TYPE }> = ({ type }) => {
  switch (type) {
    case EVENT_LOGO_TYPE.ENDED_RED:
      return <img src={EventEndedRedIcon} alt="ended" />;
    case EVENT_LOGO_TYPE.CANCELLED:
      return <img src={EventCancelledIcon} alt="cancelled" />;
    case EVENT_LOGO_TYPE.STARTED:
      return <img src={EventStartedIcon} alt="started" />;
    case EVENT_LOGO_TYPE.LOSS:
      return <img src={EventLossIconRed} alt="loss" />;
    case EVENT_LOGO_TYPE.PROFIT:
      return <img src={EventProfitIconGreen} alt="profit" />;
    case EVENT_LOGO_TYPE.CANCELLED_RED:
      return <img src={EventCancelledIconRed} alt="cancelled" />;
    default:
      return null;
  }
};

const _DashboardPortfolioEmptyView: React.FC<
  WithTranslation & WithRoleProps
> = ({ role, t }) => (
  <div className="dashboard__empty-events">
    <div className="dashboard__empty-events-text">
      {t(`${role}.dashboard-page.portfolio-events.empty-events.text`)}
    </div>
    <div className="dashboard__empty-events-item dashboard__empty-events-item--secondary">
      <EvenLogoIcon type={EVENT_LOGO_TYPE.ENDED_RED} />
      <div className="dashboard__empty-events-item-label">
        {t(`${role}.dashboard-page.portfolio-events.empty-events.finished`)}
      </div>
    </div>
    <div className="dashboard__empty-events-item">
      <EvenLogoIcon type={EVENT_LOGO_TYPE.STARTED} />
      <div className="dashboard__empty-events-item-label">
        {t(`${role}.dashboard-page.portfolio-events.empty-events.started`)}
      </div>
    </div>
    <div className="dashboard__empty-events-item">
      <EvenLogoIcon type={EVENT_LOGO_TYPE.LOSS} />
      <div className="dashboard__empty-events-item-label">
        {t(
          `${role}.dashboard-page.portfolio-events.empty-events.investor-left`
        )}
      </div>
    </div>
    <div className="dashboard__empty-events-item">
      <EvenLogoIcon type={EVENT_LOGO_TYPE.PROFIT} />
      <div className="dashboard__empty-events-item-label">
        {t(`${role}.dashboard-page.portfolio-events.empty-events.new-investor`)}
      </div>
    </div>
    <div className="dashboard__empty-events-item">
      <EvenLogoIcon type={EVENT_LOGO_TYPE.CANCELLED_RED} />
      <div className="dashboard__empty-events-item-label">
        {t(`${role}.dashboard-page.portfolio-events.empty-events.interrupted`)}
      </div>
    </div>
  </div>
);

const DashboardPortfolioEmptyView = compose<React.ComponentType>(
  withRole,
  translate(),
  React.memo
)(_DashboardPortfolioEmptyView);
export default DashboardPortfolioEmptyView;

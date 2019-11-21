import { EVENT_LOGO_TYPE } from "components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo.helper";
import useRole from "hooks/use-role.hook";
import EventCancelledIconRed from "media/event-cancelled-red.svg";
import EventCancelledIcon from "media/event-cancelled.svg";
import EventEndedRedIcon from "media/event-ended-red.svg";
import EventLossIconRed from "media/event-loss-red.svg";
import EventProfitIconGreen from "media/event-profit-green.svg";
import EventStartedIcon from "media/event-started.svg";
import * as React from "react";
import { useTranslation } from "react-i18next";

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

const _DashboardPortfolioEmptyView: React.FC = () => {
  const [t] = useTranslation();
  const role = useRole();
  return (
    <div className="dashboard__empty-events">
      <div className="dashboard__empty-events-text">
        {t(
          `${
            role ? `${role}.` : ""
          }dashboard-page.portfolio-events.empty-events.text`
        )}
      </div>
      <div className="dashboard__empty-events-item dashboard__empty-events-item--secondary">
        <EvenLogoIcon type={EVENT_LOGO_TYPE.ENDED_RED} />
        <div className="dashboard__empty-events-item-label">
          {t(
            `${
              role ? `${role}.` : ""
            }dashboard-page.portfolio-events.empty-events.finished`
          )}
        </div>
      </div>
      <div className="dashboard__empty-events-item">
        <EvenLogoIcon type={EVENT_LOGO_TYPE.STARTED} />
        <div className="dashboard__empty-events-item-label">
          {t(
            `${
              role ? `${role}.` : ""
            }dashboard-page.portfolio-events.empty-events.started`
          )}
        </div>
      </div>
      <div className="dashboard__empty-events-item">
        <EvenLogoIcon type={EVENT_LOGO_TYPE.LOSS} />
        <div className="dashboard__empty-events-item-label">
          {t(
            `${
              role ? `${role}.` : ""
            }dashboard-page.portfolio-events.empty-events.investor-left`
          )}
        </div>
      </div>
      <div className="dashboard__empty-events-item">
        <EvenLogoIcon type={EVENT_LOGO_TYPE.PROFIT} />
        <div className="dashboard__empty-events-item-label">
          {t(
            `${
              role ? `${role}.` : ""
            }dashboard-page.portfolio-events.empty-events.new-investor`
          )}
        </div>
      </div>
      <div className="dashboard__empty-events-item">
        <EvenLogoIcon type={EVENT_LOGO_TYPE.CANCELLED_RED} />
        <div className="dashboard__empty-events-item-label">
          {t(
            `${
              role ? `${role}.` : ""
            }dashboard-page.portfolio-events.empty-events.interrupted`
          )}
        </div>
      </div>
    </div>
  );
};

const DashboardPortfolioEmptyView = React.memo(_DashboardPortfolioEmptyView);
export default DashboardPortfolioEmptyView;

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { EvenLogoIcon } from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import { EVENT_LOGO_TYPE } from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo.helper";
import { ROLE_ENV } from "shared/constants/constants";

const _DashboardPortfolioEmptyView: React.FC<InjectedTranslateProps> = ({
  t
}) => (
  <div className="dashboard__empty-events">
    <div className="dashboard__empty-events-text">
      {t(`${ROLE_ENV}.dashboard-page.portfolio-events.empty-events.text`)}
    </div>
    <div className="dashboard__empty-events-item dashboard__empty-events-item--secondary">
      <EvenLogoIcon type={EVENT_LOGO_TYPE.ENDED_RED} />
      <div className="dashboard__empty-events-item-label">
        {t(`${ROLE_ENV}.dashboard-page.portfolio-events.empty-events.finished`)}
      </div>
    </div>
    <div className="dashboard__empty-events-item">
      <EvenLogoIcon type={EVENT_LOGO_TYPE.STARTED} />
      <div className="dashboard__empty-events-item-label">
        {t(`${ROLE_ENV}.dashboard-page.portfolio-events.empty-events.started`)}
      </div>
    </div>
    <div className="dashboard__empty-events-item">
      <EvenLogoIcon type={EVENT_LOGO_TYPE.LOSS} />
      <div className="dashboard__empty-events-item-label">
        {t(
          `${ROLE_ENV}.dashboard-page.portfolio-events.empty-events.investor-left`
        )}
      </div>
    </div>
    <div className="dashboard__empty-events-item">
      <EvenLogoIcon type={EVENT_LOGO_TYPE.PROFIT} />
      <div className="dashboard__empty-events-item-label">
        {t(
          `${ROLE_ENV}.dashboard-page.portfolio-events.empty-events.new-investor`
        )}
      </div>
    </div>
    <div className="dashboard__empty-events-item">
      <EvenLogoIcon type={EVENT_LOGO_TYPE.CANCELLED_RED} />
      <div className="dashboard__empty-events-item-label">
        {t(
          `${ROLE_ENV}.dashboard-page.portfolio-events.empty-events.interrupted`
        )}
      </div>
    </div>
  </div>
);

const DashboardPortfolioEmptyView = React.memo(
  translate()(_DashboardPortfolioEmptyView)
);
export default DashboardPortfolioEmptyView;

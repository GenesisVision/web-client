import React from "react";
import { translate } from "react-i18next";

import { EvenLogoIcon } from "./dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import { EventLogoType } from "./dashboard-portfolio-event-logo/dashboard-portfolio-event-logo.helper";

const DashboardPortfolioEmptyView = ({ t }) => (
  <div className="dashboard__empty-events">
    <div className="dashboard__empty-events-text">
      {t("dashboard.portfolio-events.empty-events.text")}
    </div>
    <div className="dashboard__empty-events-item dashboard__empty-events-item--secondary">
      <EvenLogoIcon type={EventLogoType.endedRed} />
      <div className="dashboard__empty-events-item-label">
        {t("dashboard.portfolio-events.empty-events.finished")}
      </div>
    </div>
    <div className="dashboard__empty-events-item">
      <EvenLogoIcon type={EventLogoType.started} />
      <div className="dashboard__empty-events-item-label">
        {t("dashboard.portfolio-events.empty-events.started")}
      </div>
    </div>
    <div className="dashboard__empty-events-item">
      <EvenLogoIcon type={EventLogoType.loss} />
      <div className="dashboard__empty-events-item-label">
        {t("dashboard.portfolio-events.empty-events.investor-left")}
      </div>
    </div>
    <div className="dashboard__empty-events-item">
      <EvenLogoIcon type={EventLogoType.profit} />
      <div className="dashboard__empty-events-item-label">
        {t("dashboard.portfolio-events.empty-events.new-investor")}
      </div>
    </div>
    <div className="dashboard__empty-events-item">
      <EvenLogoIcon type={EventLogoType.cancelledRed} />
      <div className="dashboard__empty-events-item-label">
        {t("dashboard.portfolio-events.empty-events.interrupted")}
      </div>
    </div>
  </div>
);

export default translate()(DashboardPortfolioEmptyView);

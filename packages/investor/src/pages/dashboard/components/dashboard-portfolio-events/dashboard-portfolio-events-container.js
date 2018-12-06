import React, { Component } from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import { EvenLogoIcon } from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import { EventLogoType } from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo.helper";
import Surface from "shared/components/surface/surface";

import DashboardPortfolioEvents from "./dashboard-portfolio-events";
import DashboardPortfolioEventsLoader from "./dashboard-portfolio-events-loader";

class DashboardPortfolioEventsContainer extends Component {
  emptyEvents = () => {
    const { t } = this.props;
    return (
      <div className="dashboard__empty-events">
        <div className="dashboard__empty-events-text">
          {t(
            `${
              process.env.REACT_APP_PLATFORM
            }.portfolio-events.empty-events.text`
          )}
        </div>
        <div className="dashboard__empty-events-item dashboard__empty-events-item--secondary">
          <EvenLogoIcon type={EventLogoType.endedRed} />
          <div className="dashboard__empty-events-item-label">
            {t(
              `${
                process.env.REACT_APP_PLATFORM
              }.portfolio-events.empty-events.finished`
            )}
          </div>
        </div>
        <div className="dashboard__empty-events-item">
          <EvenLogoIcon type={EventLogoType.started} />
          <div className="dashboard__empty-events-item-label">
            {t(
              `${
                process.env.REACT_APP_PLATFORM
              }.portfolio-events.empty-events.started`
            )}
          </div>
        </div>
        <div className="dashboard__empty-events-item">
          <EvenLogoIcon type={EventLogoType.loss} />
          <div className="dashboard__empty-events-item-label">
            {t(
              `${
                process.env.REACT_APP_PLATFORM
              }.portfolio-events.empty-events.investor-left`
            )}
          </div>
        </div>
        <div className="dashboard__empty-events-item">
          <EvenLogoIcon type={EventLogoType.profit} />
          <div className="dashboard__empty-events-item-label">
            {t(
              `${
                process.env.REACT_APP_PLATFORM
              }.portfolio-events.empty-events.new-investor`
            )}
          </div>
        </div>
        <div className="dashboard__empty-events-item">
          <EvenLogoIcon type={EventLogoType.cancelledRed} />
          <div className="dashboard__empty-events-item-label">
            {t(
              `${
                process.env.REACT_APP_PLATFORM
              }.portfolio-events.empty-events.interrupted`
            )}
          </div>
        </div>
      </div>
    );
  };

  renderEvents = () => {
    const { isPending, data, title, fullEventsUrl, manager } = this.props;
    if (isPending && !data)
      return <DashboardPortfolioEventsLoader fullEventsUrl={fullEventsUrl} />;
    if (data === undefined) return null;
    return (
      (data.total && (
        <DashboardPortfolioEvents
          title={title}
          events={data.events}
          fullEventsUrl={fullEventsUrl}
        />
      )) ||
      (manager && this.emptyEvents()) ||
      null
    );
  };
  render() {
    const { t } = this.props;

    return (
      <Surface className="surface--horizontal-paddings dashboard-portfolio-events">
        <h3>
          {t(
            `${
              process.env.REACT_APP_PLATFORM
            }.dashboard-page.portfolio-events.title`
          )}
        </h3>
        {this.renderEvents()}
      </Surface>
    );
  }
}

export default compose(translate())(DashboardPortfolioEventsContainer);

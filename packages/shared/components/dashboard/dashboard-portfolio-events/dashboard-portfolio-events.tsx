import "./dashboard-portfolio-events.scss";

import {
  DashboardPortfolioEvent,
  DashboardPortfolioEvents as DashboardPortfolioEventsType
} from "gv-api-web";
import { GVButton } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import GVScroll from "shared/components/scroll/gvscroll";
import Surface from "shared/components/surface/surface";

import DashboardPortfolioEventsListLoader from "./dashboard-portfolio-event-loader/dashboard-portfolio-event-list-loader";

const DASHBOARD_EVENTS_STYLE = { height: "100%", minHeight: "450px" };

const _DashboardPortfolioEvents: React.FC<Props & InjectedTranslateProps> = ({
  t,
  fullEventsUrl,
  title,
  isPending,
  data,
  eventView: DashboardPortfolioEvent,
  emptyView: DashboardPortfolioEmptyView
}) => {
  const role = process.env.REACT_APP_PLATFORM;
  const renderEvents = () => {
    if (isPending && !data) return <DashboardPortfolioEventsListLoader />;
    if (data === undefined) return null;
    return (
      (data.total &&
        data.events.map((event, idx) => (
          <DashboardPortfolioEvent event={event} key={idx} />
        ))) ||
      (DashboardPortfolioEmptyView ? <DashboardPortfolioEmptyView /> : null)
    );
  };
  return (
    <Surface className="surface--horizontal-paddings dashboard-portfolio-events">
      <h3>{t(`${role}.dashboard-page.portfolio-events.title`)}</h3>
      <div className="dashboard-portfolio-events__scroll-container">
        <GVScroll
          autoHide
          autoHideTimeout={1000}
          style={DASHBOARD_EVENTS_STYLE}
        >
          <div className="dashboard-portfolio-events__list">
            {renderEvents()}
          </div>
        </GVScroll>
      </div>

      <Link
        className="dashboard-portfolio-events__see-all"
        to={{
          pathname: fullEventsUrl,
          state: `/ ${title}`
        }}
      >
        <GVButton variant="text" color="secondary">
          <>
            {t(`${role}.dashboard-page.portfolio-events.see-all-button`)}{" "}
            &#8250;
          </>
        </GVButton>
      </Link>
    </Surface>
  );
};

interface Props {
  fullEventsUrl: string;
  title: string;
  isPending: boolean;
  data: DashboardPortfolioEventsType;
  eventView: React.ComponentType<{ event: DashboardPortfolioEvent }>;
  emptyView: React.ComponentType;
}

const DashboardPortfolioEvents = compose(translate())(
  _DashboardPortfolioEvents
);
export default DashboardPortfolioEvents;

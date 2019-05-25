import "./dashboard-portfolio-events.scss";

import {
  DashboardPortfolioEvent as DashboardPortfolioEventType,
  DashboardPortfolioEvents as DashboardPortfolioEventsType,
  ManagerPortfolioEvent,
  ManagerPortfolioEvents
} from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import GVScroll from "shared/components/scroll/gvscroll";
import Surface from "shared/components/surface/surface";
import { ROLE_ENV } from "shared/constants/constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";

import DashboardPortfolioEventsListLoader from "./dashboard-portfolio-event-loader/dashboard-portfolio-event-list-loader";

const DASHBOARD_EVENTS_STYLE = { height: "100%", minHeight: "450px" };

const _Events: React.FC<IEventsProps> = ({
  events,
  total,
  EmptyView,
  EventComponent
}) => (
  <>
    {(total &&
      events.map((event, idx) => <EventComponent event={event} key={idx} />)) ||
      (EmptyView ? <EmptyView /> : null)}
  </>
);
const Events = React.memo(withLoader(_Events));

interface IEventsProps {
  EmptyView?: React.ComponentType;
  EventComponent: React.ComponentType<{
    event: DashboardPortfolioEventType | ManagerPortfolioEvent;
  }>;
  events: Array<DashboardPortfolioEventType | ManagerPortfolioEvent>;
  total: number;
}

const _DashboardPortfolioEvents: React.FC<Props & InjectedTranslateProps> = ({
  t,
  fullEventsUrl,
  title,
  isPending,
  data,
  eventView: DashboardPortfolioEvent,
  emptyView: DashboardPortfolioEmptyView
}) => (
  <Surface className="surface--horizontal-paddings dashboard-portfolio-events">
    <h3>{t(`${ROLE_ENV}.dashboard-page.portfolio-events.title`)}</h3>
    <div className="dashboard-portfolio-events__scroll-container">
      <GVScroll autoHide autoHideTimeout={1000} style={DASHBOARD_EVENTS_STYLE}>
        <div className="dashboard-portfolio-events__list">
          <Events
            condition={!isPending && !!data}
            loader={<DashboardPortfolioEventsListLoader />}
            events={data! && data!.events}
            total={data! && data!.total}
            EventComponent={DashboardPortfolioEvent}
            EmptyView={DashboardPortfolioEmptyView}
          />
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
          {t(`${ROLE_ENV}.dashboard-page.portfolio-events.see-all-button`)}{" "}
          &#8250;
        </>
      </GVButton>
    </Link>
  </Surface>
);

interface Props {
  fullEventsUrl: string;
  title: string;
  isPending: boolean;
  data?: DashboardPortfolioEventsType | ManagerPortfolioEvents;
  eventView: React.ComponentType<any>;
  emptyView?: React.ComponentType;
}

const DashboardPortfolioEvents = compose<
  React.ComponentType<Props & WithLoaderProps>
>(
  React.memo,
  withLoader,
  translate()
)(_DashboardPortfolioEvents);
export default DashboardPortfolioEvents;

import "./dashboard-portfolio-events.scss";

import {
  DashboardPortfolioEvent as DashboardPortfolioEventType,
  DashboardPortfolioEvents as DashboardPortfolioEventsType,
  ManagerPortfolioEvent,
  ManagerPortfolioEvents
} from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import Surface from "shared/components/surface/surface";
import withLoader from "shared/decorators/with-loader";
import withRole, { WithRoleProps } from "shared/decorators/with-role";

import DashboardPortfolioEventsListLoader from "./dashboard-portfolio-event-loader/dashboard-portfolio-event-list-loader";

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

const _DashboardPortfolioEvents: React.FC<Props> = ({
  role,
  t,
  fullEventsUrl,
  title,
  data,
  eventView: DashboardPortfolioEvent,
  emptyView: DashboardPortfolioEmptyView
}) => (
  <Surface className="surface--horizontal-paddings dashboard-portfolio-events">
    <h3>{t(`${role}.dashboard-page.portfolio-events.title`)}</h3>
    <div className="dashboard-portfolio-events__scroll-container">
      <div className="dashboard-portfolio-events__list">
        <Events
          condition={!!data}
          loader={<DashboardPortfolioEventsListLoader />}
          events={data! && data!.events}
          total={data! && data!.total}
          EventComponent={DashboardPortfolioEvent}
          EmptyView={DashboardPortfolioEmptyView}
        />
      </div>
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
          {t(`${role}.dashboard-page.portfolio-events.see-all-button`)} &#8250;
        </>
      </GVButton>
    </Link>
  </Surface>
);

interface Props extends OwnProps, WithTranslation, WithRoleProps {}

interface OwnProps {
  fullEventsUrl: string;
  title: string;
  data?: DashboardPortfolioEventsType | ManagerPortfolioEvents;
  eventView: React.ComponentType<any>;
  emptyView?: React.ComponentType;
}

const DashboardPortfolioEvents = compose<React.ComponentType<OwnProps>>(
  withRole,
  translate(),
  React.memo
)(_DashboardPortfolioEvents);
export default DashboardPortfolioEvents;

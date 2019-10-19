import "./dashboard-portfolio-events.scss";

import {
  InvestmentEventViewModel,
  InvestmentEventViewModels
} from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import GVButton from "shared/components/gv-button";
import Surface from "shared/components/surface/surface";
import withLoader from "shared/decorators/with-loader";
import useRole from "shared/hooks/use-role.hook";

import DashboardPortfolioEventsListLoader from "./dashboard-portfolio-event-loader/dashboard-portfolio-event-list-loader";
import DashboardPortfolioEvent from "./dashboard-portfolio-event/dashboard-portfolio-event";

const _Events: React.FC<IEventsProps> = ({
  from,
  events,
  total,
  EmptyView
}) => {
  if (!total) {
    return EmptyView ? <EmptyView /> : null;
  }
  return (
    <>
      {events.map((event, idx) => (
        <DashboardPortfolioEvent event={event} key={idx} from={from} />
      ))}
    </>
  );
};
const Events = React.memo(withLoader(_Events));

interface IEventsProps {
  EmptyView?: React.ComponentType;
  events: Array<InvestmentEventViewModel>;
  total: number;
  from: string;
}

const _DashboardPortfolioEvents: React.FC<Props> = ({
  fullEventsUrl,
  title,
  data,
  emptyView
}) => {
  const [t] = useTranslation();
  const role = useRole();
  return (
    <>
      <h3>{t(`${role}.dashboard-page.portfolio-events.title`)}</h3>
      <div className="dashboard-portfolio-events__scroll-container">
        <div className="dashboard-portfolio-events__list">
          <Events
            condition={!!data}
            loader={<DashboardPortfolioEventsListLoader />}
            events={data! && data!.events}
            total={data! && data!.total}
            EmptyView={emptyView}
            from={title}
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
            {t(`${role}.dashboard-page.portfolio-events.see-all-button`)}{" "}
            &#8250;
          </>
        </GVButton>
      </Link>
    </>
  );
};

interface Props extends OwnProps {}

interface OwnProps {
  fullEventsUrl: string;
  title: string;
  data?: InvestmentEventViewModels;
  emptyView?: React.ComponentType;
}

const DashboardPortfolioEvents = React.memo(_DashboardPortfolioEvents);
export default DashboardPortfolioEvents;

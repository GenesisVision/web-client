import "./dashboard-portfolio-events.scss";

import {
  InvestmentEventViewModel,
  InvestmentEventViewModels
} from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import GVButton from "shared/components/gv-button";
import { withBlurLoader } from "shared/decorators/with-blur-loader";
import useRole from "shared/hooks/use-role.hook";

import { DashboardPortfolioEventsLoaderData } from "../dashboard.loaders-data";
import DashboardPortfolioEvent from "./dashboard-portfolio-event/dashboard-portfolio-event";

const _Events: React.FC<IEventsProps> = ({
  from,
  data: events,
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
const Events = React.memo(withBlurLoader(_Events));

interface IEventsProps {
  EmptyView?: React.ComponentType;
  data: Array<InvestmentEventViewModel>;
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
            loaderData={DashboardPortfolioEventsLoaderData}
            data={data! && data!.events}
            total={
              (data! && data!.total) ||
              DashboardPortfolioEventsLoaderData.length
            }
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

interface Props {
  fullEventsUrl: string;
  title: string;
  data?: InvestmentEventViewModels;
  emptyView?: React.ComponentType;
}

const DashboardPortfolioEvents = React.memo(_DashboardPortfolioEvents);
export default DashboardPortfolioEvents;

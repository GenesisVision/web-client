import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardPortfolioEvents from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-events";
import { DASHBOARD_EVENTS_ROUTE } from "shared/routes/dashboard.routes";

import { dashboardEventsSelector } from "../../reducers/dashboard-events.reducer";
import { getPortfolioEvents } from "../../services/dashboard.service";
import DashboardPortfolioEmptyView from "./dashboard-portfolio-empty-view";

const _DashboardPortfolioEventsSection: React.FC<Props> = ({ title }) => {
  const dispatch = useDispatch();
  const data = useSelector(dashboardEventsSelector);
  useEffect(() => {
    dispatch(getPortfolioEvents);
  }, []);
  return (
    <DashboardPortfolioEvents
      fullEventsUrl={DASHBOARD_EVENTS_ROUTE}
      title={title}
      data={data}
      emptyView={DashboardPortfolioEmptyView}
    />
  );
};

interface Props {
  title: string;
}

const DashboardPortfolioEventsSection = React.memo(
  _DashboardPortfolioEventsSection
);
export default DashboardPortfolioEventsSection;

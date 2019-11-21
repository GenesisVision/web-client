import DashboardPortfolioEvents from "components/dashboard/dashboard-portfolio-events/dashboard-portfolio-events";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DASHBOARD_EVENTS_ROUTE } from "routes/dashboard.routes";

import { getPortfolioEvents } from "../../services/dashboard.service";
import DashboardPortfolioEmptyView from "./dashboard-portfolio-empty-view";

const _DashboardPortfolioEventsSection: React.FC<Props> = ({ title }) => {
  const dispatch = useDispatch();
  const data = {
    events: [],
    total: 0
  }; //useSelector(dashboardEventsSelector);
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

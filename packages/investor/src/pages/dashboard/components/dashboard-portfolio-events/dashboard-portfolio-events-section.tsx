import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardPortfolioEvents from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-events";
import { DASHBOARD_EVENTS_ROUTE } from "shared/routes/dashboard.routes";

import { dashboardEventsSelector } from "../../reducers/dashboard-events.reducer";
import { getTopPortfolioEvents } from "../../services/dashboard-events.services";

const _DashboardPortfolioEventsSection: React.FC<Props> = ({ title }) => {
  const dispatch = useDispatch();
  const data = useSelector(dashboardEventsSelector);
  useEffect(() => {
    dispatch(getTopPortfolioEvents);
  }, [dispatch]);
  return (
    <DashboardPortfolioEvents
      fullEventsUrl={DASHBOARD_EVENTS_ROUTE}
      title={title}
      data={data}
    />
  );
};

interface Props extends OwnProps {}

interface OwnProps {
  title: string;
}

const DashboardPortfolioEventsSection = React.memo(
  _DashboardPortfolioEventsSection
);
export default DashboardPortfolioEventsSection;

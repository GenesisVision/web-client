import React, { Fragment } from "react";

export const DASHBOARD_ROUTE = "/dashboard";
export const DASHBOARD_PORTFOLIO_ROUTE = `${DASHBOARD_ROUTE}/portfolio`;
export const DASHBOARD_FAVOURITES_ROUTE = `${DASHBOARD_ROUTE}/favourites`;

const DashboardRoutes = () => {
  return (
    <Fragment>
      <h1>Dashboard</h1>
    </Fragment>
  );
};

export default DashboardRoutes;

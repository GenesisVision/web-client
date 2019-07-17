import DashboardPage from "pages/dashboard/dashboard.page";
import React from "react";
import withPrivateRoute from "shared/decorators/with-private-route";

const Dashboard = () => {
  return <DashboardPage />;
};

Dashboard.getInitialProps = async () => {
  return {
    namespacesRequired: ["translation"]
  };
};

export default withPrivateRoute(Dashboard);

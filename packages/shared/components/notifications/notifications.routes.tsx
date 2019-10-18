import * as React from "react";
import { Route, Switch } from "react-router-dom";

import FundNotificationPage from "./fund-settings.page";
import NotificationsPage from "./general-settings.page";
import ProgramNotificationPage from "./program-settings.page";

export const NOTIFICATIONS_ROUTE = "/notifications";
export const PROGRAM_NOTIFICATIONS_ROUTE = `${NOTIFICATIONS_ROUTE}/program/:id`;
export const PROGRAM_NOTIFICATIONS_FOLDER_ROUTE = `${NOTIFICATIONS_ROUTE}/program/[id]`;
export const FUND_NOTIFICATIONS_ROUTE = `${NOTIFICATIONS_ROUTE}/fund/:id`;
export const FUND_NOTIFICATIONS_FOLDER_ROUTE = `${NOTIFICATIONS_ROUTE}/fund/[id]`;

const NotificationRoutes: React.FC = () => (
  <Switch>
    <Route
      path={PROGRAM_NOTIFICATIONS_ROUTE}
      component={ProgramNotificationPage}
    />
    <Route path={FUND_NOTIFICATIONS_ROUTE} component={FundNotificationPage} />
    <Route path={NOTIFICATIONS_ROUTE} component={NotificationsPage} />
  </Switch>
);

export default NotificationRoutes;

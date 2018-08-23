import React from "react";
import { Route, Switch } from "react-router-dom";

import EmailConfirmContainer from "./components/email-confirm-container";
import EmailConfirmPending from "./components/email-confirm-pending/email-confirm-pending";
import {
  EMAIL_CONFIRM_PENDING_ROUTE,
  EMAIL_CONFIRM_ROUTE
} from "./email-confirm.constants";

const EmailConfirmRoutes = () => (
  <Switch>
    <Route path={EMAIL_CONFIRM_PENDING_ROUTE} component={EmailConfirmPending} />
    <Route path={EMAIL_CONFIRM_ROUTE} component={EmailConfirmContainer} />
  </Switch>
);

export default EmailConfirmRoutes;

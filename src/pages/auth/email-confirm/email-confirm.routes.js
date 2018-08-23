import React from "react";
import { Route, Switch } from "react-router-dom";

import EmailConfirmContainer from "./components/email-confirm-container";
import EmailConfirmPending from "./components/email-confirm-pending/email-confirm-pending";

export const EMAIL_CONFIRM_ROUTE = "/email-confirm";
export const EMAIL_CONFIRM_PENDING_ROUTE = "/email-confirm/pending";

const EmailConfirmRoutes = () => (
  <Switch>
    <Route path={EMAIL_CONFIRM_PENDING_ROUTE} component={EmailConfirmPending} />
    <Route path={EMAIL_CONFIRM_ROUTE} component={EmailConfirmContainer} />
  </Switch>
);

export default EmailConfirmRoutes;

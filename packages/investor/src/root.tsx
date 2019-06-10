import { ConnectedRouter } from "connected-react-router";
import AppRoutes from "pages/app/app.routes";
import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import AuthRoutes, {
  AUTH_ROUTES_REGEX
} from "shared/components/auth/auth.routes";
import AlertMessageList from "shared/modules/alert-message/components/alert-message-list/alert-message-list";
import { HOME_ROUTE } from "shared/routes/app.routes";
import history from "shared/utils/history";

import store from "./store";

const Root: React.FC = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path={AUTH_ROUTES_REGEX} component={AuthRoutes} />
        <Route path={HOME_ROUTE} component={AppRoutes} />
      </Switch>
    </ConnectedRouter>
    <AlertMessageList />
  </Provider>
);

export default Root;

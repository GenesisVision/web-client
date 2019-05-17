import { ConnectedRouter } from "connected-react-router";
import AppRoutes from "pages/app/app.routes";
import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import GVScrollContainer from "shared/components/scroll/gvscroll-container";
import AlertMessageList from "shared/modules/alert-message/components/alert-message-list/alert-message-list";
import history from "shared/utils/history";

import store from "./store";
import AuthRoutes, { AUTH_ROUTES_REGEX } from "shared/components/auth/auth.routes";
import { HOME_ROUTE } from "shared/routes/app.routes";

const Root = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <GVScrollContainer>
          <Switch>
            <Route path={AUTH_ROUTES_REGEX} component={AuthRoutes} />
            <Route path={HOME_ROUTE} component={AppRoutes} />
          </Switch>
          <AlertMessageList />
        </GVScrollContainer>
      </ConnectedRouter>
    </Provider>
  );
};

export default Root;

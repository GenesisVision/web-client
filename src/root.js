import GVScroll from "modules/scroll/gvscroll";
import AppRoutes from "pages/app/app.routes";
import { AUTH_ROUTES_REGEX } from "pages/auth/auth.routes";
import AuthRoutes from "pages/auth/auth.routes";
import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";

import { HOME_ROUTE } from "./pages/app/app.routes";
import store from "./store";
import history from "./utils/history";

const Root = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <GVScroll>
          <Switch>
            <Route path={AUTH_ROUTES_REGEX} component={AuthRoutes} />
            <Route path={HOME_ROUTE} component={AppRoutes} />
          </Switch>
          <div id="modal-root" />
        </GVScroll>
      </ConnectedRouter>
    </Provider>
  );
};

export default Root;

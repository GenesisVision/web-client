import { ConnectedRouter } from "connected-react-router";
import AppRoutes from "pages/app/app.routes";
import { AUTH_ROUTES_REGEX } from "pages/auth/auth.routes";
import AuthRoutes from "pages/auth/auth.routes";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import GVScrollContainer from "shared/components/scroll/gvscroll-container";
import AlertMessageList from "shared/modules/alert-message/components/alert-message-list/alert-message-list";
import history from "shared/utils/history";

import { HOME_ROUTE } from "./pages/app/app.routes";
import store from "./store";

const Root = () => {
  return (
    <Provider store={store}>
      <Suspense fallback={""}>
        <ConnectedRouter history={history}>
          <GVScrollContainer>
            <Switch>
              <Route path={AUTH_ROUTES_REGEX} component={AuthRoutes} />
              <Route path={HOME_ROUTE} component={AppRoutes} />
            </Switch>
            <AlertMessageList />
          </GVScrollContainer>
        </ConnectedRouter>
      </Suspense>
    </Provider>
  );
};

export default Root;

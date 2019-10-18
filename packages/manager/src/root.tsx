import { ConnectedRouter } from "connected-react-router";
import AppRoutes from "pages/app/app.routes";
import React, { Suspense } from "react";
import { hot } from "react-hot-loader/root";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import AlertMessageList from "shared/modules/alert-message/components/alert-message-list/alert-message-list";
import { HOME_ROUTE } from "shared/routes/app.routes";
import history from "shared/utils/history";

import store from "./store";

const Root: React.FC = () => (
  <Suspense fallback="">
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path={HOME_ROUTE} component={AppRoutes} />
        </Switch>
      </ConnectedRouter>
      <AlertMessageList />
    </Provider>
  </Suspense>
);

export default process.env.NODE_ENV === "development" ? hot(Root) : Root;

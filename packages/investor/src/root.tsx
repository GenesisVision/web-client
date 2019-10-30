import { ConnectedRouter } from "connected-react-router";
import AppRoutes from "pages/app/app.routes";
import qs from "qs";
import React, { Suspense } from "react";
import { hot } from "react-hot-loader/root";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import AuthRoutes, {
  AUTH_ROUTES_REGEX
} from "shared/components/auth/auth.routes";
import { REF_PARAM_NAME } from "shared/constants/constants";
import AlertMessageList from "shared/modules/alert-message/components/alert-message-list/alert-message-list";
import { HOME_ROUTE } from "shared/routes/app.routes";
import history from "shared/utils/history";
import { setRef } from "shared/utils/ref";

import store from "./store";

const Root: React.FC = () => {
  const searchString = document.location.search.substring(1);
  const params = qs.parse(searchString);
  if (params[REF_PARAM_NAME]) setRef(params[REF_PARAM_NAME]);
  return (
    <Suspense fallback="">
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path={AUTH_ROUTES_REGEX} component={AuthRoutes} />
            <Route path={HOME_ROUTE} component={AppRoutes} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    </Suspense>
  );
};

export default process.env.NODE_ENV === "development" ? hot(Root) : Root;

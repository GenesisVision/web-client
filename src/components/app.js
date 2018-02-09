import { ConnectedRouter } from "react-router-redux";
import { Provider } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import React from "react";

import AlertMessageList from "../shared/modules/alert-message/components/alert-message-list/alert-message-list";
import Header from "./header/header";
import history from "../utils/history";
import LoginScene from "./login-scene/login-scene";
import NotFoundPage from "../shared/components/not-found/not-found";
import PrivateRoute from "../shared/components/private-route/private-route";
import RegisterScene from "./register-scene/register-scene";
import routes from "../utils/constants/routes";
import store from "../store/index";
import TradersRoute from "./TradersRoute/TradersRoute";

import { PROFILE_ROUTE } from "../modules/profile/profile.constants";
import ProfileRoutes from "../modules/profile/profile.routes";
import { DASHBOARD_ROUTE } from "../modules/dashboard/dashboard.constants";
import DashboardRoutes from "../modules/dashboard/dashboard.routes";
import Sidebar from "./sidebar/sidebar";

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path="/:rest" component={Header} />
        <div className="container-fluid">
          <div className="row">
            <Sidebar className="bg-light col-md-2 d-md-block sidebar" />
            <main className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
              <Switch>
                <Route path={routes.login} component={LoginScene} />
                <Route path={routes.signup} component={RegisterScene} />
                <Route path={routes.traders} component={TradersRoute} />
                <PrivateRoute path={PROFILE_ROUTE} component={ProfileRoutes} />
                <PrivateRoute
                  path={DASHBOARD_ROUTE}
                  component={DashboardRoutes}
                />
                <Route
                  exact
                  path={routes.index}
                  render={() => <Redirect to={PROFILE_ROUTE} />}
                />
                <Route component={NotFoundPage} />
              </Switch>
            </main>
          </div>
          <div className="col-sm-2 offset-10 fixed-bottom">
            <AlertMessageList />
          </div>
        </div>
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;

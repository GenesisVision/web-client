import { ConnectedRouter } from "react-router-redux";
import { Provider } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import React from "react";

import AlertMessageList from "../../shared/modules/alert-message/components/alert-message-list/alert-message-list";
import Header from "./Header/Header";
import history from "../../utils/history";
import InvestorScene from "../InvestorScene/InvestorScene";
import LoginScene from "../login-scene/login-scene";
import NotFoundPage from "./NotFoundPage";
import PrivateRoute from "../../shared/components/PrivateRoute";
import RegisterScene from "../register-scene/register-scene";
import routes from "../../utils/constants/routes";
import store from "../../store";
import TradersRoute from "../TradersRoute/TradersRoute";

import { PROFILE_ROUTE } from "../../modules/profile/profile.constants";
import ProfileRoutes from "../../modules/profile/profile.routes";

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path="/:rest" component={Header} />
        <div className="col-sm-2 offset-10 fixed-bottom">
          <AlertMessageList />
        </div>
        <main className="container">
          <Switch>
            <Route path={routes.login} component={LoginScene} />
            <Route path={routes.signup} component={RegisterScene} />
            <Route path={routes.traders} component={TradersRoute} />
            <PrivateRoute path={PROFILE_ROUTE} component={ProfileRoutes} />
            <PrivateRoute path={routes.dashboard} component={InvestorScene} />
            <Route
              exact
              path={routes.index}
              render={() => <Redirect to={PROFILE_ROUTE} />}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;

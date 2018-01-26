import { ConnectedRouter } from "react-router-redux";
import { Provider } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import React from "react";

import history from "../../utils/history";
import PrivateRoute from "../common/PrivateRoute";
import Header from "./Header/Header";
import InvestorScene from "../InvestorScene/InvestorScene";
import LoginScene from "../LoginScene/index";
import NotFoundPage from "./NotFoundPage";
import RegisterScene from "../RegisterScene/index";
import routes from "../../utils/constants/routes";
import store from "../../store";
import TradersRoute from "../TradersRoute/TradersRoute";
import AlertMessageList from "../../shared/alert-message/components/AlertMessageList";

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
            <PrivateRoute path={routes.dashboard} component={InvestorScene} />
            <Route
              exact
              path={routes.index}
              render={() => <Redirect to={routes.traders} />}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;

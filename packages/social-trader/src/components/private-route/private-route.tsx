import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, RouteProps } from "react-router";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { RootState } from "reducers/root-reducer";
import { LOGIN_ROUTE } from "routes/app.routes";

class _PrivateRoute extends React.PureComponent<RouteProps & StateProps> {
  renderComponent = (props: RouteComponentProps) => {
    const { component: Component, isAuthenticated } = this.props;
    return isAuthenticated && Component ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: LOGIN_ROUTE,
          state: props.location
        }}
      />
    );
  };

  render() {
    const { component: Component, isAuthenticated, ...rest } = this.props;
    return <Route {...rest} render={this.renderComponent} />;
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  isAuthenticated: isAuthenticatedSelector(state)
});

const PrivateRoute = connect(mapStateToProps)(_PrivateRoute);
export default PrivateRoute;

interface StateProps {
  isAuthenticated?: boolean;
}

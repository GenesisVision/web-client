import AppLayout from "components/app-layout/app-layout";
import React, { Component } from "react";
import { Route } from "react-router-dom";

export class AppRoute extends Component {
  renderComponent = props => {
    const { component: Component } = this.props;
    return (
      <AppLayout>
        <Component {...props} />
      </AppLayout>
    );
  };
  render() {
    const { component, ...rest } = this.props;
    return <Route {...rest} render={this.renderComponent} />;
  }
}

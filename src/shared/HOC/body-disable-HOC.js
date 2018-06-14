import React, { Component } from "react";

const BODY_DISABLED_CLASS = "body--disabled";

function bodyDisableHOC(WrappedComponent) {
  return class extends Component {
    componentDidMount() {
      document.body.classList.add(BODY_DISABLED_CLASS);
    }

    componentWillUnmount() {
      document.body.classList.remove(BODY_DISABLED_CLASS);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default bodyDisableHOC;

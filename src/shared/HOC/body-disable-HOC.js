import React, { Component } from "react";

const BODY_DISABLED_CLASS = "body--disabled";

function disableTouchEvents(e) {
  e.preventDefault();
}

function bodyDisableHOC(WrappedComponent) {
  return class extends Component {
    componentDidMount() {
      document.body.classList.add(BODY_DISABLED_CLASS);
      document.body.addEventListener("touchmove", disableTouchEvents, {
        passive: false
      });
    }

    componentWillUnmount() {
      document.body.classList.remove(BODY_DISABLED_CLASS);
      document.body.removeEventListener("touchmove", disableTouchEvents, {
        passive: false
      });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default bodyDisableHOC;

import React, { Component } from "react";
import { connect } from "react-redux";
import { isTablet } from "shared/utils/breakpoints";

import GoogleAuthDesktop from "./google-auth-steps-desktop";
import GoogleAuthMobile from "./google-auth-steps-mobile";

class GoogleAuthSteps extends Component {
  render() {
    return isTablet(this.props.innerWidth) ? (
      <GoogleAuthMobile {...this.props} />
    ) : (
      <GoogleAuthDesktop {...this.props} />
    );
  }
}

const mapStateToProps = ({ ui }) => ({
  innerWidth: ui.innerWidth
});

const GoogleAuthStepsContainer = connect(mapStateToProps)(GoogleAuthSteps);

export default GoogleAuthStepsContainer;

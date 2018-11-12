import GoogleAuthDesktop from "modules/2fa/google-auth/google-auth-steps/google-auth-steps-desktop";
import GoogleAuthMobile from "modules/2fa/google-auth/google-auth-steps/google-auth-steps-mobile";
import React, { Component } from "react";
import { connect } from "react-redux";
import { isTablet } from "shared/utils/breakpoints";

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

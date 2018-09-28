import "./google-auth-popup.scss";

import {
  GoogleAuthDesktop,
  GoogleAuthMobile
} from "modules/2fa/google-auth/google-auth-container";
import React, { Component } from "react";
import EventListener from "react-event-listener";

class GoogleAuthPopup extends Component {
  timer = null;

  state = {
    innerWidth: window.innerWidth
  };
  handleResize = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        innerWidth: window.innerWidth
      });
    }, 166);
  };
  isMobile = () => {
    return this.state.innerWidth < 992;
  };
  render() {
    return (
      <EventListener target="window" onResize={this.handleResize}>
        {this.isMobile() ? (
          <GoogleAuthMobile {...this.props} />
        ) : (
          <GoogleAuthDesktop {...this.props} />
        )}
      </EventListener>
    );
  }
}

export default GoogleAuthPopup;

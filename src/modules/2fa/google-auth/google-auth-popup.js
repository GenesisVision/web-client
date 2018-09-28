import "./google-auth-popup.scss";

import {
  GoogleAuthDesktop,
  GoogleAuthMobile
} from "modules/2fa/google-auth/google-auth-container";
import React, { Component } from "react";
import EventListener from "react-event-listener";
import { connect } from "react-redux";

class GoogleAuthPopup extends Component {
  isMobile = () => {
    return this.props.innerWidth < 992;
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

const mapStateToProps = ({ ui }) => ({
  innerWidth: ui.innerWidth
});

export default connect(mapStateToProps)(GoogleAuthPopup);

import "./profile-widget.scss";

import Popover from "components/popover/popover";
import { PROFILE_ROUTE } from "modules/profile/profile.constants";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import GVLogo from "shared/media/investor-avatar.png";

class ProfileWidget extends Component {
  state = {
    anchor: null
  };

  handleOpen = event => this.setState({ anchor: event.currentTarget });

  handleClose = () => this.setState({ anchor: null });

  render() {
    return (
      <div className={"profile-widget"}>
        <div className={"profile-widget__avatar"} onClick={this.handleOpen}>
          <img
            alt={this.props.name}
            className={"profile-widget__image"}
            src={this.props.avatar || GVLogo}
          />
        </div>
        <Popover
          anchorEl={this.state.anchor}
          onClose={this.handleClose}
          horizontal={"right"}
        >
          <div>
            <Link to={PROFILE_ROUTE}>Profile</Link>
          </div>
          <div>
            <a href={"/"}>Logout</a>
          </div>
        </Popover>
      </div>
    );
  }
}

ProfileWidget.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string
};

export default ProfileWidget;

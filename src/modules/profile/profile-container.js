import Profile from "modules/profile/profile";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { profileApiProxy } from "services/api-client/profile-api";
import authService from "services/auth-service";

class ProfileContainer extends Component {
  state = {
    data: null,
    isPending: false
  };

  componentDidMount() {
    profileApiProxy
      .v10ProfileGet(authService.getAuthArg())
      .then(data => console.info(data) || this.setState({ ...data }));
  }

  render() {
    if (!this.state.data) return null;
    return <Profile info={this.state.data} />;
  }
}

ProfileContainer.propTypes = {};

export default ProfileContainer;

import { GVButton } from "gv-react-components";
import Profile from "modules/profile/profile";
import ProfileForm from "modules/profile/profile-form";
import { PROFILE_EDIT_ROUTE } from "pages/profile/edit/edit.page";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
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
      .then(data => this.setState({ ...data }));
  }

  render() {
    if (!this.state.data) return null;
    return <Profile info={this.state.data} />;
  }
}

ProfileContainer.propTypes = {};

export default ProfileContainer;

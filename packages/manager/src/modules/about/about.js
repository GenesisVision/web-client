import PropTypes from "prop-types";
import React, { Component } from "react";
import { PROFILE_ROUTE } from "shared/components/profile/profile.constants";
import profileApi from "shared/services/api-client/profile-api";
import authService from "shared/services/auth-service";
import history from "shared/utils/history";

import AboutForm from "./about-form";

class About extends Component {
  state = {
    isPending: false,
    errorMessage: null
  };
  handleSubmit = model => {
    this.setState({ isPending: true });
    profileApi
      .v10ProfileUpdatePost(authService.getAuthArg(), {
        model
      })
      .then(data => {
        this.setState({ data }, () => {
          history.push(PROFILE_ROUTE);
        });
      })
      .catch(error => this.setState({ ...error }));
  };
  render() {
    return (
      <AboutForm
        onSubmit={this.handleSubmit}
        {...this.props}
        errorMessage={this.state.errorMessage}
        disabled={this.state.isPending}
      />
    );
  }
}

About.propTypes = {
  userName: PropTypes.string,
  about: PropTypes.string
};

export default About;

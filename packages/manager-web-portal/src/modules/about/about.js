import PropTypes from "prop-types";
import React, { Component } from "react";
import history from "utils/history";

import { PROFILE_ROUTE } from "../../pages/profile/profile.constants";
import { profileApiProxy } from "../../services/api-client/profile-api";
import authService from "../../services/auth-service";
import AboutForm from "./about-form";

class About extends Component {
  state = {
    isPending: false,
    errorMessage: null
  };
  handleSubmit = model => {
    this.setState({ isPending: true });
    profileApiProxy
      .v10ProfileUpdatePost(authService.getAuthArg(), {
        model
      })
      .then(data => {
        this.setState({ ...data }, () => {
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

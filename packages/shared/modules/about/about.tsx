import * as React from "react";
import { PROFILE_ROUTE } from "shared/components/profile/profile.constants";
import profileApi from "shared/services/api-client/profile-api";
import authService from "shared/services/auth-service";
import history from "shared/utils/history";
import { ResponseError, SetSubmittingType } from "shared/utils/types";

import AboutForm, { IAboutFormValues } from "./about-form";

class About extends React.PureComponent<Props, State> {
  state = {
    errorMessage: undefined
  };
  handleSubmit = (
    model: IAboutFormValues,
    setSubmitting: SetSubmittingType
  ) => {
    profileApi
      .v10ProfileUpdatePost(authService.getAuthArg(), {
        model
      })
      .then(() => history.push(PROFILE_ROUTE))
      .catch((error: ResponseError) => {
        this.setState({ errorMessage: error.errorMessage });
        setSubmitting(false);
      });
  };
  render() {
    return (
      <AboutForm
        onSubmit={this.handleSubmit}
        {...this.props}
        errorMessage={this.state.errorMessage}
      />
    );
  }
}

interface Props {
  userName: string;
  about: string;
}

interface State {
  errorMessage?: string;
}
export default About;

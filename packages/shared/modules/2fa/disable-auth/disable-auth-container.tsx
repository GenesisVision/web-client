import * as React from "react";
import authApi from "shared/services/api-client/auth-api";
import authService from "shared/services/auth-service";
import DisableAuthForm, {
  IDisableAuthFormFormValues
} from "./disable-auth-form";
import DisableAuthSuccess from "./disable-auth-success";
import { SetSubmittingType } from "shared/utils/types";

class DisableAuthContainer extends React.PureComponent<Props, State> {
  state = {
    success: false,
    errorMessage: ""
  };
  handleSubmit = (
    model: IDisableAuthFormFormValues,
    setSubmitting: SetSubmittingType
  ) => {
    authApi
      .v10Auth2faDisablePost(authService.getAuthArg(), {
        model
      })
      .then(data => {
        this.setState({ ...data, success: true }, this.props.onSubmit);
      })
      .catch(error => {
        this.setState({ ...error, success: false });
        setSubmitting(false);
      });
  };
  render() {
    const { success, errorMessage } = this.state;
    return success ? (
      <DisableAuthSuccess />
    ) : (
      <DisableAuthForm
        onSubmit={this.handleSubmit}
        errorMessage={errorMessage}
      />
    );
  }
}

interface Props {
  onSubmit: () => void;
}

interface State {
  success: boolean;
  errorMessage: string;
}

export default DisableAuthContainer;

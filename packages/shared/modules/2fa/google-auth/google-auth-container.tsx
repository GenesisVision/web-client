import "./google-auth.scss";

import * as React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import authApi from "shared/services/api-client/auth-api";
import authService from "shared/services/auth-service";
import GoogleAuthCodes from "../google-auth/google-auth-codes";
import GoogleAuthStepsContainer from "../google-auth/google-auth-steps/google-auth-steps";
import * as twoFactorServices from "../services/2fa.service";
import DialogLoaderGoogleAuthSteps from "./google-auth-steps/dialog-loader-google-auth-steps";
import {
  CancelablePromise,
  RecoveryCodesViewModel,
  TwoFactorAuthenticator,
  TwoFactorAuthenticatorConfirm
} from "gv-api-web";
import {
  MiddlewareDispatch,
  ResponseError,
  SetSubmittingType
} from "shared/utils/types";
import { IGoogleActivateStepFormValues } from "./google-auth-steps/google-auth-activate-step";

class GoogleAuthContainer extends React.PureComponent<Props, State> {
  state = {
    twoFactorAuthenticatorData: undefined,
    RecoveryCodesViewData: undefined,
    errorMessage: undefined,
    isPending: undefined
  };

  componentDidMount() {
    this.setState({ isPending: true });
    authApi
      .v10Auth2faCreatePost(authService.getAuthArg())
      .then(twoFactorAuthenticatorData => {
        this.setState({ twoFactorAuthenticatorData, isPending: false });
      });
  }

  handleSubmit = (
    values: IGoogleActivateStepFormValues,
    setSubmitting: SetSubmittingType
  ) => {
    const { service, onSubmit } = this.props;
    const { twoFactorAuthenticatorData } = this.state;
    if (!twoFactorAuthenticatorData) return;
    const { sharedKey } = twoFactorAuthenticatorData!;
    service
      .confirm2fa({
        ...values,
        sharedKey
      })
      .then((RecoveryCodesViewData: RecoveryCodesViewModel) => {
        this.setState({ RecoveryCodesViewData });
        onSubmit();
      })
      .catch((error: ResponseError) => {
        this.setState({ errorMessage: error.errorMessage });
        setSubmitting(false);
      });
  };

  render() {
    const {
      twoFactorAuthenticatorData,
      RecoveryCodesViewData,
      errorMessage
    } = this.state;
    if (!twoFactorAuthenticatorData) return <DialogLoaderGoogleAuthSteps />;
    const { authenticatorUri, sharedKey } = twoFactorAuthenticatorData!;
    const { codes } = RecoveryCodesViewData || { codes: undefined };
    return codes ? (
      <GoogleAuthCodes codes={codes} />
    ) : (
      <GoogleAuthStepsContainer
        authenticatorUri={authenticatorUri}
        sharedKey={sharedKey}
        onSubmit={this.handleSubmit}
        errorMessage={errorMessage}
      />
    );
  }
}

interface Props extends DispatchProps, OwnProps {}

interface OwnProps {
  onSubmit: () => void;
}

interface DispatchProps {
  service: {
    confirm2fa: (
      model: TwoFactorAuthenticatorConfirm
    ) => CancelablePromise<RecoveryCodesViewModel>;
  };
}

interface State {
  twoFactorAuthenticatorData?: TwoFactorAuthenticator;
  RecoveryCodesViewData?: RecoveryCodesViewModel;
  isPending?: boolean;
  errorMessage?: string;
}

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    confirm2fa: (model: TwoFactorAuthenticatorConfirm) =>
      dispatch(twoFactorServices.confirm2fa(model))
  }
});

export default compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(GoogleAuthContainer);

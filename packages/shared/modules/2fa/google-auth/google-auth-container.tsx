import "./google-auth.scss";

import {
  RecoveryCodesViewModel,
  TwoFactorAuthenticator,
  TwoFactorAuthenticatorConfirm
} from "gv-api-web";
import React, { useCallback, useEffect, useState } from "react";
import { withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import useErrorMessage from "shared/hooks/error-message.hook";
import authApi from "shared/services/api-client/auth-api";
import authService from "shared/services/auth-service";
import { MiddlewareDispatch, SetSubmittingType } from "shared/utils/types";

import GoogleAuthCodes from "../google-auth/google-auth-codes";
import GoogleAuthStepsContainer from "../google-auth/google-auth-steps/google-auth-steps";
import * as twoFactorServices from "../services/2fa.service";
import DialogLoaderGoogleAuthSteps from "./google-auth-steps/dialog-loader-google-auth-steps";
import { IGoogleActivateStepFormValues } from "./google-auth-steps/google-auth-activate-step";

const GoogleAuthContainer: React.FC<Props> = ({ service, onSubmit }) => {
  const [TFAData, setTFAData] = useState<TwoFactorAuthenticator | undefined>(
    undefined
  );
  const [recoveryCodesView, setRecoveryCodesView] = useState<
    RecoveryCodesViewModel | undefined
  >(undefined);
  const { errorMessage, setErrorMessage } = useErrorMessage();
  useEffect(() => {
    authApi.v10Auth2faCreatePost(authService.getAuthArg()).then(setTFAData);
  }, []);
  const handleSubmit = useCallback(
    (
      values: IGoogleActivateStepFormValues,
      setSubmitting: SetSubmittingType
    ) => {
      if (!TFAData) return;
      service
        .confirm2fa({
          ...values,
          sharedKey: TFAData.sharedKey
        })
        .then(setRecoveryCodesView)
        .then(onSubmit)
        .catch(setErrorMessage)
        .finally(() => setSubmitting(false));
    },
    [TFAData]
  );

  if (!TFAData) return <DialogLoaderGoogleAuthSteps />;
  const { authenticatorUri, sharedKey } = TFAData!;
  const { codes } = recoveryCodesView || { codes: undefined };
  return codes ? (
    <GoogleAuthCodes codes={codes} />
  ) : (
    <GoogleAuthStepsContainer
      authenticatorUri={authenticatorUri}
      sharedKey={sharedKey}
      onSubmit={handleSubmit}
      errorMessage={errorMessage}
    />
  );
};

interface Props extends DispatchProps, OwnProps {}

interface OwnProps {
  onSubmit: () => void;
}

interface DispatchProps {
  service: {
    confirm2fa: (
      model: TwoFactorAuthenticatorConfirm
    ) => Promise<RecoveryCodesViewModel>;
  };
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
  ),
  React.memo
)(GoogleAuthContainer);

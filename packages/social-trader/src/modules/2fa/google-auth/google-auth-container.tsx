import "./google-auth.scss";

import { TwoFactorAuthenticator } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import GoogleAuthCodes from "../google-auth/google-auth-codes";
import GoogleAuthStepsContainer from "../google-auth/google-auth-steps/google-auth-steps";
import * as twoFactorServices from "../services/2fa.service";
import { fetchTFAData } from "../services/2fa.service";
import DialogLoaderGoogleAuthSteps from "./google-auth-steps/dialog-loader-google-auth-steps";
import { IGoogleActivateStepFormValues } from "./google-auth-steps/google-auth-activate-step";

const _GoogleAuthContainer: React.FC<Props> = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const {
    data: recoveryCodesView,
    errorMessage,
    sendRequest: confirm2fa
  } = useApiRequest({
    middleware: [onSubmit],
    request: values => dispatch(twoFactorServices.confirm2fa(values))
  });
  const { data: TFAData } = useApiRequest<TwoFactorAuthenticator>({
    request: fetchTFAData,
    fetchOnMount: true
  });

  const handleSubmit = useCallback(
    (values: IGoogleActivateStepFormValues) => {
      if (!TFAData) return;
      return confirm2fa({
        ...values,
        sharedKey: TFAData.sharedKey
      });
    },
    [TFAData]
  );

  if (!TFAData) return <DialogLoaderGoogleAuthSteps />;
  const { authenticatorUri, sharedKey } = TFAData;
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

interface Props {
  onSubmit: () => void;
}

const GoogleAuthContainer = React.memo(_GoogleAuthContainer);
export default GoogleAuthContainer;

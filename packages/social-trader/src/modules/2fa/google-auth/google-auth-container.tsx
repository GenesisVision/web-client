import "./google-auth.scss";

import { TwoFactorAuthenticator } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authApi from "services/api-client/auth-api";
import authService from "services/auth-service";
import { SetSubmittingType } from "utils/types";

import GoogleAuthCodes from "../google-auth/google-auth-codes";
import GoogleAuthStepsContainer from "../google-auth/google-auth-steps/google-auth-steps";
import * as twoFactorServices from "../services/2fa.service";
import DialogLoaderGoogleAuthSteps from "./google-auth-steps/dialog-loader-google-auth-steps";
import { IGoogleActivateStepFormValues } from "./google-auth-steps/google-auth-activate-step";

const GoogleAuthContainer: React.FC<Props> = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const {
    data: recoveryCodesView,
    errorMessage,
    sendRequest: confirm2fa
  } = useApiRequest({
    request: values => dispatch(twoFactorServices.confirm2fa(values))
  });

  const [TFAData, setTFAData] = useState<TwoFactorAuthenticator | undefined>(
    undefined
  );

  useEffect(() => {
    authApi.createTwoStepAuth(authService.getAuthArg()).then(setTFAData);
  }, []);

  const handleSubmit = useCallback(
    (
      values: IGoogleActivateStepFormValues,
      setSubmitting: SetSubmittingType
    ) => {
      if (!TFAData) return;
      confirm2fa(
        {
          ...values,
          sharedKey: TFAData.sharedKey
        },
        setSubmitting
      ).then(onSubmit);
    },
    [TFAData]
  );

  if (!TFAData || !recoveryCodesView) return <DialogLoaderGoogleAuthSteps />;
  const { authenticatorUri, sharedKey } = TFAData!;
  const { codes } = recoveryCodesView;
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

export default React.memo(GoogleAuthContainer);

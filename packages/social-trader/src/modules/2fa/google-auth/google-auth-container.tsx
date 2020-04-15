import { withBlurLoader } from "decorators/with-blur-loader";
import { RecoveryCode, TwoFactorAuthenticator } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { MiddlewareDispatch } from "utils/types";

import GoogleAuthCodes from "../google-auth/google-auth-codes";
import GoogleAuthStepsContainer from "../google-auth/google-auth-steps/google-auth-steps";
import * as twoFactorServices from "../services/2fa.service";
import { fetchTFAData } from "../services/2fa.service";
import { IGoogleActivateStepFormValues } from "./google-auth-steps/google-auth-activate-step";
import "./google-auth.scss";

const _GoogleAuthContainerForm: React.FC<{
  onSubmit: (values: IGoogleActivateStepFormValues) => any;
  errorMessage?: string;
  data: TwoFactorAuthenticator;
  codes?: Array<RecoveryCode>;
}> = ({ data: TFAData, codes, onSubmit, errorMessage }) => {
  const { authenticatorUri, sharedKey } = TFAData;
  return codes ? (
    <GoogleAuthCodes codes={codes} />
  ) : (
    <GoogleAuthStepsContainer
      authenticatorUri={authenticatorUri}
      sharedKey={sharedKey}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
    />
  );
};
const GoogleAuthContainerForm = withBlurLoader(
  React.memo(_GoogleAuthContainerForm)
);

const _GoogleAuthContainer: React.FC<Props> = ({ onSubmit }) => {
  const dispatch = useDispatch<MiddlewareDispatch>();
  const {
    data: recoveryCodesView,
    errorMessage,
    sendRequest: confirm2fa
  } = useApiRequest({
    middleware: [onSubmit],
    request: values => dispatch(twoFactorServices.confirm2fa(values))
  });
  const { data: TFAData } = useApiRequest({
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

  const { codes } = recoveryCodesView || { codes: undefined };
  return (
    <GoogleAuthContainerForm
      loaderData={{ sharedKey: "", authenticatorUri: "" }}
      data={TFAData!}
      codes={codes}
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

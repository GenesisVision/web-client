import * as React from "react";
import { useCallback } from "react";
import useErrorMessage from "shared/hooks/error-message.hook";
import useIsOpen from "shared/hooks/is-open.hook";
import authApi from "shared/services/api-client/auth-api";
import authService from "shared/services/auth-service";
import { SetSubmittingType } from "shared/utils/types";

import DisableAuthForm, {
  IDisableAuthFormFormValues
} from "./disable-auth-form";
import DisableAuthSuccess from "./disable-auth-success";

const _DisableAuthContainer: React.FC<Props> = ({ onSubmit }) => {
  const [isSuccess, setSuccess, setFail] = useIsOpen();
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const handleSubmit = useCallback(
    (model: IDisableAuthFormFormValues, setSubmitting: SetSubmittingType) =>
      authApi
        .v10Auth2faDisablePost(authService.getAuthArg(), {
          model
        })
        .then(() => {
          setSuccess();
          onSubmit();
        })
        .catch(error => {
          setErrorMessage(error);
          setFail();
          setSubmitting(false);
        }),
    []
  );
  return isSuccess ? (
    <DisableAuthSuccess />
  ) : (
    <DisableAuthForm onSubmit={handleSubmit} errorMessage={errorMessage} />
  );
};

interface Props {
  onSubmit: () => void;
}

const DisableAuthContainer = React.memo(_DisableAuthContainer);
export default DisableAuthContainer;

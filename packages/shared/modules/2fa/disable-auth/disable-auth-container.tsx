import * as React from "react";
import { useCallback } from "react";
import useApiRequest from "shared/hooks/api-request.hook";
import useIsOpen from "shared/hooks/is-open.hook";
import { SetSubmittingType } from "shared/utils/types";

import { disableTFA } from "../services/2fa.service";
import DisableAuthForm, {
  IDisableAuthFormFormValues
} from "./disable-auth-form";
import DisableAuthSuccess from "./disable-auth-success";

const _DisableAuthContainer: React.FC<Props> = ({ onSubmit }) => {
  const [isSuccess, setSuccess, setFail] = useIsOpen();
  const { errorMessage, sendRequest } = useApiRequest({
    request: disableTFA,
    catchCallback: () => setFail()
  });
  const handleSubmit = useCallback(
    (model: IDisableAuthFormFormValues, setSubmitting: SetSubmittingType) =>
      sendRequest(model, setSubmitting)
        .then(setSuccess)
        .then(onSubmit),
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

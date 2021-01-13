import authActions from "actions/auth-actions";
import { Push } from "components/link/link";
import { NOT_FOUND_PAGE_ROUTE } from "components/not-found/not-found.routes";
import useApiRequest from "hooks/api-request.hook";
import useErrorMessage from "hooks/error-message.hook";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LOGIN_ROUTE } from "routes/app.routes";
import { DASHBOARD_ROUTE } from "routes/dashboard.routes";
import { ResponseError } from "utils/handle-error-response";
import { MiddlewareDispatch } from "utils/types";

import { useThreeFactorState } from "../signin/signin.service";
import SecurityVerificationForm from "./security-verification-form";
import { confirmThreeStepAuth } from "./service/security-verification.service";

const _SecurityVerificationContainer: React.FC<Props> = ({ code }) => {
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const dispatch = useDispatch<MiddlewareDispatch>();
  const { clearThreeFactorState, getThreeFactorState } = useThreeFactorState();
  const updateTokenMiddleware = () => {
    dispatch(authActions.updateTokenAction(true));
  };
  const { email, tempToken: token } = getThreeFactorState();
  const { sendRequest, data } = useApiRequest({
    middleware: [updateTokenMiddleware],
    successMessage: "auth:security-verification.success-alert-message",
    request: values => {
      return confirmThreeStepAuth(values)
        .then(res => {
          if (res) {
            return res;
          }
          Push(LOGIN_ROUTE);
        })
        .catch((e: ResponseError) => setErrorMessage(e));
    }
  });
  useEffect(() => {
    if (data) {
      clearThreeFactorState();
      Push(DASHBOARD_ROUTE);
    }
  }, [data]);
  useEffect(() => {
    if (code) {
      sendRequest({ email, token, code });
    } else if (!email || !token) {
      Push(NOT_FOUND_PAGE_ROUTE);
    }
  }, []);
  return (
    <SecurityVerificationForm
      onSubmit={sendRequest}
      errorMessage={errorMessage}
      email={email}
      token={token}
    />
  );
};

interface Props {
  code: string;
}

const SecurityVerificationContainer = React.memo(
  _SecurityVerificationContainer
);
export default SecurityVerificationContainer;
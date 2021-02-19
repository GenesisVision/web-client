import authActions from "actions/auth-actions";
import { Push } from "components/link/link";
import { NOT_FOUND_PAGE_ROUTE } from "components/not-found/not-found.routes";
import { useAlerts } from "hooks/alert.hook";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { LOGIN_ROUTE } from "routes/app.routes";
import { DASHBOARD_ROUTE } from "routes/dashboard.routes";
import authService from "services/auth-service";
import { postponeCallback } from "utils/hook-form.helpers";
import { ResponseError } from "utils/types";

import { restorePassword } from "../services/forgot-password.service";
import PasswordRestore, {
  IRestorePasswordFormValues
} from "./password-restore";

const _PasswordRestoreContainer: React.FC<Props> = ({ userId, code }) => {
  const { successAlert } = useAlerts();
  const dispatch = useDispatch();
  const successCallback = (response: string) => {
    authService.storeToken(response);
    dispatch(authActions.updateTokenAction(true));
  };
  const { sendRequest, errorMessage } = useApiRequest({
    middleware: [
      successCallback,
      postponeCallback(() => Push(DASHBOARD_ROUTE))
    ],
    catchCallback: ({ code }: ResponseError) => {
      if (code === "RequiresTwoFactor") {
        Push(LOGIN_ROUTE);
        successAlert("auth:password-restore.success-alert-message");
      }
    },
    request: restorePassword,
    successMessage: "auth:password-restore.success-alert-message"
  });

  const handleSubmit = useCallback(
    (formData: IRestorePasswordFormValues) => {
      const params = {
        userId,
        code,
        ...formData
      };
      return sendRequest(params);
    },
    [userId, code]
  );

  // if ((!userId || !code) && typeof window !== "undefined")
  //   Push(NOT_FOUND_PAGE_ROUTE);

  return (
    <PasswordRestore errorMessage={errorMessage} onSubmit={handleSubmit} />
  );
};

interface Props {
  userId: string;
  code: string;
}

const PasswordRestoreContainer = React.memo(_PasswordRestoreContainer);
export default PasswordRestoreContainer;

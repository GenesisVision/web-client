import { Push } from "components/link/link";
import { NOT_FOUND_PAGE_ROUTE } from "components/not-found/not-found.routes";
import useApiRequest from "hooks/api-request.hook";
import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { LOGIN_ROUTE } from "routes/app.routes";
import { DASHBOARD_ROUTE } from "routes/dashboard.routes";
import { getPostponedOnCallback } from "utils/hook-form.helpers";
import { ResponseError } from "utils/types";

import { restorePassword } from "../services/forgot-password.service";
import PasswordRestore, {
  IRestorePasswordFormValues
} from "./password-restore";

const _PasswordRestoreContainer: React.FC<Props> = ({ userId, code }) => {
  const dispatch = useDispatch();
  const { sendRequest, errorMessage } = useApiRequest({
    middleware: [getPostponedOnCallback(() => Push(DASHBOARD_ROUTE))],
    catchCallback: ({ code }: ResponseError) => {
      if (code === "RequiresTwoFactor") {
        Push(LOGIN_ROUTE);
        dispatch(
          alertMessageActions.success(
            "auth.password-restore.success-alert-message",
            true
          )
        );
      }
    },
    request: args => dispatch(restorePassword(args)),
    successMessage: "auth.password-restore.success-alert-message"
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

  if (!userId || !code) Push(NOT_FOUND_PAGE_ROUTE);

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

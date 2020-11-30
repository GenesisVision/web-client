import authActions from "actions/auth-actions";
import { Button } from "components/button/button";
import { ProfileHeaderInfoAction } from "components/header/actions/header-actions";
import { Push } from "components/link/link";
import { SECURITY_ROUTE } from "components/profile/profile.constants";
import { ChangePasswordViewModel } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import authService from "services/auth-service";
import { MiddlewareDispatch } from "utils/types";

import PasswordChangeForm from "./password-change-form";
import { changePassword } from "./service/password-change.service";

const _PasswordChange: React.FC = () => {
  const dispatch = useDispatch<MiddlewareDispatch>();
  const successMiddleware = (response: string) => {
    authService.storeToken(response);
    dispatch(authActions.updateTokenAction(true));
    Push(SECURITY_ROUTE);
    dispatch(ProfileHeaderInfoAction());
  };
  const { errorMessage, sendRequest } = useApiRequest({
    middleware: [successMiddleware],
    successMessage: "auth:password-change.success-alert",
    request: changePassword
  });
  const [t] = useTranslation();
  const [isOpen, setIsOpen] = useIsOpen();
  const handleSubmit = useCallback(
    (model: ChangePasswordViewModel) => sendRequest(model),
    []
  );
  return (
    <>
      {!isOpen && (
        <Button onClick={setIsOpen}>
          {t("profile-page:settings.change-password")}
        </Button>
      )}
      {isOpen && (
        <PasswordChangeForm
          onSubmit={handleSubmit}
          errorMessage={errorMessage}
        />
      )}
    </>
  );
};

const PasswordChange = React.memo(_PasswordChange);
export default PasswordChange;

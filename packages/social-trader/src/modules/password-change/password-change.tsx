import "./password-change.scss";

import GVButton from "components/gv-button";
import { ChangePasswordViewModel } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { MiddlewareDispatch } from "utils/types";

import PasswordChangeForm from "./password-change-form";
import { changePassword } from "./service/password-change.service";

const _PasswordChange: React.FC = () => {
  const dispatch = useDispatch<MiddlewareDispatch>();
  const { errorMessage, sendRequest } = useApiRequest({
    request: values => dispatch(changePassword(values))
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
        <GVButton onClick={setIsOpen}>
          {t("profile-page.settings.change-password")}
        </GVButton>
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

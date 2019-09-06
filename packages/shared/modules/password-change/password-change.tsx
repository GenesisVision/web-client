import "./password-change.scss";

import { ChangePasswordViewModel } from "gv-api-web";
import React, { useCallback } from "react";
import { withTranslation as translate, useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import useErrorMessage from "shared/hooks/error-message.hook";
import useIsOpen from "shared/hooks/is-open.hook";
import { MiddlewareDispatch } from "shared/utils/types";

import PasswordChangeForm from "./password-change-form";
import { changePassword } from "./service/password-change.service";

const _PasswordChange: React.FC<Props> = ({ service }) => {
  const [t] = useTranslation();
  const [isOpen, setIsOpen] = useIsOpen();
  const {
    errorMessage,
    setErrorMessage,
    cleanErrorMessage
  } = useErrorMessage();
  const handleSubmit = useCallback(
    (model: ChangePasswordViewModel) =>
      service
        .changePassword(model)
        .then(cleanErrorMessage)
        .catch(setErrorMessage),
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

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    changePassword: (model: ChangePasswordViewModel) =>
      dispatch(changePassword(model))
  }
});

interface Props extends DispatchProps {}

interface DispatchProps {
  service: {
    changePassword(model: ChangePasswordViewModel): Promise<void>;
  };
}

const PasswordChange = compose<React.ComponentType>(
  connect(
    null,
    mapDispatchToProps
  ),
  translate(),
  React.memo
)(_PasswordChange);
export default PasswordChange;

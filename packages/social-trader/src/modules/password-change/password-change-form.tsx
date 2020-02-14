import classNames from "classnames";
import GVButton from "components/gv-button";
import { GVHookFormField } from "components/gv-hook-form-field";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { ChangePasswordViewModel } from "gv-api-web";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";

import { passwordChangeValidationSchema } from "./password-change.validators";

export enum PASSWORD_CHANGE_FORM_FIELDS {
  oldPassword = "oldPassword",
  password = "password",
  confirmPassword = "confirmPassword"
}

interface IPasswordChangeFormOwnProps {
  errorMessage?: string | null;
  onSubmit: (values: ChangePasswordViewModel) => void;
}

const _PasswordChangeForm: React.FC<IPasswordChangeFormOwnProps> = ({
  errorMessage,
  onSubmit
}) => {
  const [t] = useTranslation();
  const form = useForm<ChangePasswordViewModel>({
    defaultValues: {
      [PASSWORD_CHANGE_FORM_FIELDS.oldPassword]: "",
      [PASSWORD_CHANGE_FORM_FIELDS.password]: "",
      [PASSWORD_CHANGE_FORM_FIELDS.confirmPassword]: ""
    },
    validationSchema: passwordChangeValidationSchema(t),
    mode: "onBlur"
  });
  const {
    errors,
    watch,
    formState: { touched, dirty, isValid, isSubmitting, isSubmitted }
  } = form;
  const { password, confirmPassword } = watch();
  const className = classNames({
    "change-password__equal":
      !errors[PASSWORD_CHANGE_FORM_FIELDS.password] &&
      !errors[PASSWORD_CHANGE_FORM_FIELDS.confirmPassword] &&
      touched[PASSWORD_CHANGE_FORM_FIELDS.confirmPassword] &&
      password === confirmPassword
  });

  const isSuccessful = isSubmitted && !errorMessage;
  const disabled = isSubmitting || !dirty || !isValid || isSuccessful;

  return (
    <HookForm className="change-password" form={form} onSubmit={onSubmit}>
      <GVHookFormField
        component={SimpleTextField}
        label={t("auth.password-change.current-password")}
        name={PASSWORD_CHANGE_FORM_FIELDS.oldPassword}
        type="password"
        autoComplete="new-password"
        autoFocus
      />
      <div className="change-password__new">
        <GVHookFormField
          className={className}
          component={SimpleTextField}
          label={t("auth.password-change.password")}
          type="password"
          name={PASSWORD_CHANGE_FORM_FIELDS.password}
          autoComplete="new-password"
        />
        <GVHookFormField
          className={className}
          component={SimpleTextField}
          label={t("auth.password-change.confirm-password")}
          type="password"
          name={PASSWORD_CHANGE_FORM_FIELDS.confirmPassword}
          autoComplete="new-password"
        />
        <div className="form-error">{errorMessage}</div>
      </div>
      <GVButton
        type="submit"
        isPending={isSubmitting}
        isSuccessful={isSuccessful}
        disabled={disabled}
      >
        {t("buttons.confirm")}
      </GVButton>
    </HookForm>
  );
};

const PasswordChangeForm = React.memo(_PasswordChangeForm);
export default PasswordChangeForm;

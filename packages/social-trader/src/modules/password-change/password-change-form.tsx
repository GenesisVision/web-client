import clsx from "clsx";
import FormError from "components/form/form-error/form-error";
import { GVHookFormField } from "components/gv-hook-form-field";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import { ChangePasswordViewModel } from "gv-api-web";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { getConfirmPasswordValidationRules, passwordRules } from "utils/validators/validators";

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
    mode: "onBlur"
  });
  const {
    errors,
    watch,
    formState: { touched }
  } = form;
  const { password, confirmPassword } = watch();
  const className = clsx({
    "change-password__equal":
      !errors[PASSWORD_CHANGE_FORM_FIELDS.password] &&
      !errors[PASSWORD_CHANGE_FORM_FIELDS.confirmPassword] &&
      touched[PASSWORD_CHANGE_FORM_FIELDS.confirmPassword] &&
      password === confirmPassword
  });

  return (
    <HookForm resetOnSuccess form={form} onSubmit={onSubmit}>
      <Row>
        <GVHookFormField
          component={SimpleTextField}
          label={t("auth:password-change.current-password")}
          name={PASSWORD_CHANGE_FORM_FIELDS.oldPassword}
          type="password"
          autoComplete="new-password"
          autoFocus
          rules={passwordRules(t)}
        />
      </Row>
      <Row>
        <RowItem>
          <GVHookFormField
            className={className}
            component={SimpleTextField}
            label={t("auth:password-change.password")}
            type="password"
            name={PASSWORD_CHANGE_FORM_FIELDS.password}
            autoComplete="new-password"
            rules={passwordRules(t)}
          />
        </RowItem>
        <RowItem>
          <GVHookFormField
            className={className}
            component={SimpleTextField}
            label={t("auth:password-change.confirm-password")}
            type="password"
            name={PASSWORD_CHANGE_FORM_FIELDS.confirmPassword}
            autoComplete="new-password"
            rules={getConfirmPasswordValidationRules({ watch, t })}
          />
        </RowItem>
      </Row>
      {errorMessage && (
        <Row>
          <FormError error={errorMessage} />
        </Row>
      )}
      <Row>
        <SubmitButton isSuccessful={!errorMessage}>
          {t("buttons.confirm")}
        </SubmitButton>
      </Row>
    </HookForm>
  );
};

const PasswordChangeForm = React.memo(_PasswordChangeForm);
export default PasswordChangeForm;

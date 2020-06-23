import classNames from "classnames";
import FormError from "components/form/form-error/form-error";
import { GVHookFormField } from "components/gv-hook-form-field";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
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
    formState: { touched }
  } = form;
  const { password, confirmPassword } = watch();
  const className = classNames({
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

import { DialogError } from "components/dialog/dialog-error";
import GVButton from "components/gv-button";
import { GVHookFormField } from "components/gv-hook-form-field";
import Link from "components/link/link";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { LOGIN_ROUTE } from "routes/app.routes";
import { HookForm } from "utils/hook-form.helpers";
import { object, string } from "yup";

export enum FORGOT_PASSWORD_FORM_FIELDS {
  captchaCheckResult = "captchaCheckResult",
  email = "email"
}

const _ForgotPasswordForm: React.FC<Props> = ({ onSubmit, errorMessage }) => {
  const [t] = useTranslation();

  const form = useForm<IForgotPasswordFormValues>({
    defaultValues: {
      [FORGOT_PASSWORD_FORM_FIELDS.email]: ""
    },
    validationSchema: object().shape({
      [FORGOT_PASSWORD_FORM_FIELDS.email]: string()
        .email(t("auth.password-restore.validators.email-invalid"))
        .required(t("auth.password-restore.validators.email-required"))
    }),
    mode: "onChange"
  });

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <GVHookFormField
        type="email"
        name={FORGOT_PASSWORD_FORM_FIELDS.email}
        label={t("auth.password-restore.forgot-password.email-field-text")}
        addon="fas fa-envelope"
        autoComplete="email"
        autoFocus
        component={SimpleTextField}
      />
      <DialogError error={errorMessage} />
      <div className="forgot-password__navigation">
        <Link to={LOGIN_ROUTE} className="forgot-password__btn-back">
          <GVButton variant="text" color="secondary">
            <>
              &larr;{" "}
              {t("auth.password-restore.forgot-password.back-button-text")}
            </>
          </GVButton>
        </Link>
        <SubmitButton id="forgotPassword" isSuccessful={!errorMessage}>
          {t("auth.password-restore.forgot-password.confirm-button-text")}
        </SubmitButton>
      </div>
    </HookForm>
  );
};

interface Props {
  onSubmit: (data: IForgotPasswordFormValues) => void;
  errorMessage: string;
}

export interface IForgotPasswordFormValues {
  [FORGOT_PASSWORD_FORM_FIELDS.email]: string;
}

const ForgotPasswordForm = React.memo(_ForgotPasswordForm);
export default ForgotPasswordForm;

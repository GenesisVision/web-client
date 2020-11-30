import { Button } from "components/button/button";
import FormError from "components/form/form-error/form-error";
import { GVHookFormField } from "components/gv-hook-form-field";
import Link from "components/link/link";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import {
  CAPTCHA_STATUS,
  CaptchaStatusContext
} from "pages/auth/captcha-container";
import React, { useContext } from "react";
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

  const requestStatus = useContext(CaptchaStatusContext);

  const form = useForm<IForgotPasswordFormValues>({
    defaultValues: {
      [FORGOT_PASSWORD_FORM_FIELDS.email]: ""
    },
    validationSchema: object().shape({
      [FORGOT_PASSWORD_FORM_FIELDS.email]: string()
        .email(t("auth:password-restore.validators.email-invalid"))
        .required(t("auth:password-restore.validators.email-required"))
    }),
    mode: "onChange"
  });

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <GVHookFormField
        wide
        type="email"
        name={FORGOT_PASSWORD_FORM_FIELDS.email}
        label={t("auth:password-restore.forgot-password.email-field-text")}
        addon="fas fa-envelope"
        autoComplete="email"
        autoFocus
        component={SimpleTextField}
      />
      {errorMessage && (
        <Row>
          <FormError error={errorMessage} />
        </Row>
      )}
      <Row size={"large"}>
        <RowItem>
          <Link to={LOGIN_ROUTE}>
            <Button noPadding variant="text" color="secondary">
              <>
                &larr;{" "}
                {t("auth:password-restore.forgot-password.back-button-text")}
              </>
            </Button>
          </Link>
        </RowItem>
        <RowItem>
          <SubmitButton
            id="forgotPassword"
            disabled={requestStatus === CAPTCHA_STATUS.PENDING}
            isSuccessful={requestStatus === CAPTCHA_STATUS.SUCCESS}
            isPending={requestStatus === CAPTCHA_STATUS.PENDING}
          >
            {t("auth:password-restore.forgot-password.confirm-button-text")}
          </SubmitButton>
        </RowItem>
      </Row>
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

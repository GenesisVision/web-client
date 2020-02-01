import { DialogError } from "components/dialog/dialog-error";
import GVButton from "components/gv-button";
import GVFormikField from "components/gv-formik-field";
import GVTextField from "components/gv-text-field";
import Link from "components/link/link";
import { InjectedFormikProps, withFormik } from "formik";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { LOGIN_ROUTE } from "routes/app.routes";
import { SetSubmittingType } from "utils/types";
import { object, string } from "yup";

export enum FORGOT_PASSWORD_FORM_FIELDS {
  captchaCheckResult = "captchaCheckResult",
  email = "email"
}

const _ForgotPasswordForm: React.FC<InjectedFormikProps<
  Props,
  IForgotPasswordFormValues
>> = ({ t, isSubmitting, handleSubmit, error }) => (
  <form id="forgotPasswordForm" onSubmit={handleSubmit} noValidate>
    <GVFormikField
      type="email"
      name={FORGOT_PASSWORD_FORM_FIELDS.email}
      label={t("auth.password-restore.forgot-password.email-field-text")}
      addon="fas fa-envelope"
      autoComplete="email"
      autoFocus
      component={GVTextField}
    />
    <DialogError error={error} />
    <div className="forgot-password__navigation">
      <Link to={LOGIN_ROUTE} className="forgot-password__btn-back">
        <GVButton variant="text" color="secondary">
          <>
            &larr; {t("auth.password-restore.forgot-password.back-button-text")}
          </>
        </GVButton>
      </Link>
      <GVButton
        id="forgotPassword"
        color="primary"
        variant="contained"
        disabled={isSubmitting}
        type="submit"
      >
        {t("auth.password-restore.forgot-password.confirm-button-text")}
      </GVButton>
    </div>
  </form>
);

interface Props extends OwnProps, WithTranslation {}

interface OwnProps {
  onSubmit(
    data: IForgotPasswordFormValues,
    setSubmitting: SetSubmittingType
  ): void;
  errorMessage: string;
}

export interface IForgotPasswordFormValues {
  [FORGOT_PASSWORD_FORM_FIELDS.email]: string;
}

const ForgotPasswordForm = compose<React.FC<OwnProps>>(
  translate(),
  withFormik<Props, IForgotPasswordFormValues>({
    displayName: "forgotPassword",
    mapPropsToValues: () => ({
      [FORGOT_PASSWORD_FORM_FIELDS.email]: ""
    }),
    validationSchema: ({ t }: Props) =>
      object().shape({
        [FORGOT_PASSWORD_FORM_FIELDS.email]: string()
          .email(t("auth.password-restore.validators.email-invalid"))
          .required(t("auth.password-restore.validators.email-required"))
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_ForgotPasswordForm);
export default ForgotPasswordForm;

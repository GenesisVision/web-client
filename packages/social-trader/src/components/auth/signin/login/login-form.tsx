import FormError from "components/form/form-error/form-error";
import GVButton from "components/gv-button";
import GVFormikField from "components/gv-formik-field";
import GVTextField from "components/gv-text-field";
import Link from "components/link/link";
import { InjectedFormikProps, withFormik } from "formik";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { SetSubmittingType } from "utils/types";

import { FORGOT_PASSWORD_ROUTE } from "../../forgot-password/forgot-password.routes";
import validationSchema from "./login-form.validators";

enum FIELDS {
  email = "email",
  password = "password"
}

const _LoginForm: React.FC<InjectedFormikProps<
  Props,
  ILoginFormFormValues
>> = ({ t, isSubmitting, handleSubmit, error, isValid }) => (
  <form
    id="loginForm"
    className="login-form"
    onSubmit={handleSubmit}
    noValidate
  >
    <GVFormikField
      type="email"
      name={FIELDS.email}
      label={t("auth.login.placeholder.email")}
      autoComplete="email"
      component={GVTextField}
    />
    <GVFormikField
      type="password"
      name={FIELDS.password}
      label={t("auth.login.placeholder.password")}
      autoComplete="current-password"
      component={GVTextField}
    />

    <div className="login-form__forgot">
      <Link to={FORGOT_PASSWORD_ROUTE}>
        <GVButton noPadding variant="text">
          {t("auth.login.forgot")}
        </GVButton>
      </Link>
    </div>
    <FormError error={error} />

    <div className="login__submit-block">
      <GVButton
        className="login__submit-button"
        id="loginSubmit"
        disabled={isSubmitting || !isValid}
        type="submit"
      >
        {t("auth.login.confirm-button-text")}
      </GVButton>
    </div>
  </form>
);

interface Props extends OwnProps, WithTranslation {}

interface OwnProps {
  onSubmit(data: ILoginFormFormValues, setSubmitting: SetSubmittingType): void;
  error: string;
}

export interface ILoginFormFormValues {
  [FIELDS.email]: string;
  [FIELDS.password]: string;
}

const LoginForm = compose<React.FC<OwnProps>>(
  translate(),
  withFormik<Props, ILoginFormFormValues>({
    displayName: "loginForm",
    isInitialValid: true,
    mapPropsToValues: () => ({
      [FIELDS.email]: "",
      [FIELDS.password]: ""
    }),
    validationSchema: validationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_LoginForm);
export default LoginForm;

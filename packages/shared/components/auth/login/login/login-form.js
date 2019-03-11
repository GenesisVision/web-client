import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import React from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";

import validationSchema from "./login-form.validators";

const LoginForm = ({
  t,
  isSubmitting,
  handleSubmit,
  error,
  isValid,
  dirty,
  FORGOT_PASSWORD_ROUTE
}) => {
  return (
    <form
      id="loginForm"
      className="login-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <GVFormikField
        type="email"
        name="email"
        label={t("auth.login.placeholder.email")}
        autoComplete="email"
        component={GVTextField}
      />
      <GVFormikField
        type="password"
        name="password"
        label={t("auth.login.placeholder.password")}
        autoComplete="current-password"
        component={GVTextField}
      />

      <div className="login-form__forgot">
        <Link to={FORGOT_PASSWORD_ROUTE}>
          <GVButton variant="text">{t("auth.login.forgot")}</GVButton>
        </Link>
      </div>
      <FormError error={error} />

      <GVButton
        className="login__submit-button"
        id="loginSubmit"
        disabled={isSubmitting || !isValid}
        type="submit"
      >
        {t("auth.login.confirm-button-text")}
      </GVButton>
    </form>
  );
};

const withTranslationAndFormik = compose(
  withTranslation(),
  withFormik({
    displayName: "loginForm",
    isInitialValid: true,
    mapPropsToValues: () => ({
      email: "",
      password: ""
    }),
    validationSchema: validationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(LoginForm);

export default withTranslationAndFormik;

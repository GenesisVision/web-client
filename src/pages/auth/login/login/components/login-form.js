import Form from "components/form/form";
import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";

import { FORGOT_PASSWORD_ROUTE } from "../../../forgot-password/forgot-password.routes";
import validationSchema from "./login-form.validators";

const LoginForm = ({ t, isSubmitting, handleSubmit, error }) => {
  return (
    <Form
      className="login-form"
      id="loginForm"
      onSubmit={handleSubmit}
      noValidate
    >
      <GVFormikField
        type="email"
        name="email"
        placeholder={t("auth.login.placeholder.email")}
        autoComplete="email"
        component={GVTextField}
      />
      <GVFormikField
        type="password"
        name="password"
        placeholder={t("auth.login.placeholder.password")}
        autoComplete="current-password"
        component={GVTextField}
      />

      <Link to={FORGOT_PASSWORD_ROUTE}>
        <GVButton variant="text">{t("auth.login.forgot")}</GVButton>
      </Link>

      <div className={"form__error"}>{error}</div>
      <GVButton
        className="login__submit-button"
        id="loginSubmit"
        color="primary"
        variant="contained"
        disabled={isSubmitting}
        type="submit"
      >
        {t("auth.login.confirm-button-text")}
      </GVButton>
    </Form>
  );
};

const withTranslationAndFormik = compose(
  translate(),
  withFormik({
    displayName: "loginForm",
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

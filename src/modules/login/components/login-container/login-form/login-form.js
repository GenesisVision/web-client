import Form from "components/form/form";
import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import { FORGOT_PASSWORD_ROUTE } from "modules/password-reset/password-reset.constants";
import React from "react";
import { translate } from "react-i18next";
import { compose } from "redux";

import validationSchema from "./login-form.validators";

const LoginForm = ({ t, isSubmitting, handleSubmit }) => {
  return (
    <Form
      className={"login-form"}
      id="loginForm"
      onSubmit={handleSubmit}
      noValidate
    >
      <GVFormikField
        id={"loginEmail"}
        type="email"
        name="email"
        placeholder={t("login-form.placeholder.email")}
        autoComplete="email"
        className={"login-input gv-text-field"}
        CustomComponent={GVTextField}
      />
      <GVFormikField
        id={"loginPassword"}
        type="password"
        name="password"
        placeholder={t("login-form.placeholder.password")}
        autoComplete="current-password"
        className={"login-input gv-text-field"}
        adornment={<a href={FORGOT_PASSWORD_ROUTE}>{t("login-form.forgot")}</a>}
        CustomComponent={GVTextField}
      />
      <GVButton
        className="login-button"
        id="loginSubmit"
        title="submit login form"
        color="primary"
        variant="contained"
        disabled={isSubmitting}
      >
        {t("login-form.login")}
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

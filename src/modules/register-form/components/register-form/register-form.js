import "./register-form.css";

import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import { compose } from "redux";

import FormError from "../../../../shared/components/form/form-error/form-error";
import validationSchema from "./register-form.validators";

const RegisterForm = ({ isSubmitting, handleSubmit, error, t }) => {
  return (
    <form id="registerForm" onSubmit={handleSubmit} noValidate>
      <GVFormikField
        type="email"
        name="email"
        label={t("auth.signup.email-field-text")}
        component={GVTextField}
      />

      <GVFormikField
        type="new-password"
        name="password"
        label={t("auth.signup.password-field-text")}
        component={GVTextField}
      />

      <GVFormikField
        type="new-password"
        name="confirmPassword"
        label={t("auth.signup.password-confirm-field-text")}
        component={GVTextField}
      />

      <FormError error={error} />

      <GVButton type="submit" id="registerFormSubmit">
        {t("auth.signup.title")}
      </GVButton>
    </form>
  );
};

const withTranslationAndFormik = compose(
  translate(),
  withFormik({
    displayName: "register",
    mapPropsToValues: () => ({
      email: "",
      password: "",
      confirmPassword: ""
    }),
    validationSchema: validationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(RegisterForm);

export default withTranslationAndFormik;

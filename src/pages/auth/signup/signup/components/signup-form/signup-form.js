import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";

import validationSchema from "./signup-form.validators";

const SignUpForm = ({ isSubmitting, handleSubmit, error, t }) => {
  return (
    <form
      id="signUpForm"
      className="signup-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <GVFormikField
        type="email"
        name="email"
        label={t("auth.signup.email-field-text")}
        autoComplete="email"
        component={GVTextField}
      />

      <GVFormikField
        type="password"
        name="password"
        label={t("auth.signup.password-field-text")}
        component={GVTextField}
        autocomplete="new-password"
      />

      <GVFormikField
        type="password"
        name="confirmPassword"
        label={t("auth.signup.password-confirm-field-text")}
        component={GVTextField}
        autocomplete="new-password"
      />

      <FormError error={error} />

      <GVButton
        type="submit"
        id="signUpFormSubmit"
        className="signup-form__submit-button"
      >
        {t("auth.signup.title")}
      </GVButton>
    </form>
  );
};

const withTranslationAndFormik = compose(
  translate(),
  withFormik({
    displayName: "signup-form",
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
)(SignUpForm);

export default withTranslationAndFormik;

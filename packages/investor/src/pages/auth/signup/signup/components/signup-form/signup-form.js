import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import GVCheckbox from "shared/components/gv-checkbox/gv-checkbox";

import validationSchema from "./signup-form.validators";

const SignUpForm = ({
  isSubmitting,
  handleSubmit,
  error,
  t,
  isValid,
  dirty
}) => {
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
        autoFocus
        component={GVTextField}
      />

      <GVFormikField
        type="password"
        name="password"
        label={t("auth.signup.password-field-text")}
        component={GVTextField}
        autoComplete="new-password"
      />

      <GVFormikField
        type="password"
        name="confirmPassword"
        label={t("auth.signup.password-confirm-field-text")}
        component={GVTextField}
        autoComplete="new-password"
      />

      <GVFormikField
        type="checkbox"
        color="primary"
        name="privacyPolicy"
        label={
          <span>
            {t("auth.signup.i-accept-text")}{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://genesis.vision/privacy-policy.html"
              onClick={e => e.stopPropagation()}
            >
              {t("auth.signup.privacy-policy-text")}
            </a>
          </span>
        }
        component={GVCheckbox}
      />

      <GVFormikField
        type="checkbox"
        color="primary"
        name="acceptTerms"
        label={
          <span>
            {t("auth.signup.i-accept-text")}{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://genesis.vision/terms.html"
              onClick={e => e.stopPropagation()}
            >
              {t("auth.signup.accept-terms-text")}
            </a>
          </span>
        }
        component={GVCheckbox}
      />

      <GVFormikField
        type="checkbox"
        color="primary"
        name="residentUSA"
        label={t("auth.signup.resident-USA-text")}
        component={GVCheckbox}
      />

      <FormError error={error} />

      <GVButton
        type="submit"
        id="signUpFormSubmit"
        className="signup-form__submit-button"
        disabled={!isValid || !dirty}
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
    mapPropsToValues: props => ({
      refCode: props.refCode,
      email: "",
      password: "",
      confirmPassword: "",
      privacyPolicy: false,
      acceptTerms: false,
      residentUSA: false
    }),
    validationSchema: validationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(SignUpForm);

export default withTranslationAndFormik;

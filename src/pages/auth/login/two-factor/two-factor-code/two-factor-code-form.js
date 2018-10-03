import "./two-factor-code.scss";

import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import { LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE } from "pages/auth/login/login.routes";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";

import validationSchema from "./two-factor-code-form.validators";

const TwoFactorCodeForm = ({ t, handleSubmit, isSubmitting, error }) => {
  return (
    <form id="twoFactorForm" onSubmit={handleSubmit} noValidate>
      <div className="login-two-factor">
        <h3 className="login-two-factor__header">
          {t("auth.login.two-factor.title")}
        </h3>
        <div className="login-two-factor__text">
          {t("auth.login.two-factor.text")}
        </div>
        <GVFormikField
          type="text"
          name="twoFactorCode"
          label={t("auth.login.two-factor.input-label")}
          autoComplete="off"
          component={GVTextField}
        />

        <div className="login-two-factor__recovery-info">
          {t("auth.login.two-factor.recovery-info")}
        </div>
        <GVButton className="login-two-factor__recovery-link" variant="text">
          <Link to={LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE}>
            {t("auth.login.two-factor.link-to-recovery")}
          </Link>
        </GVButton>
        <div className="login-two-fator__submit">
          <GVButton
            type="submit"
            id="signUpFormSubmit"
            className="signup-form__submit-button"
          >
            {t("auth.login.two-factor.verify")}
          </GVButton>
        </div>
      </div>
    </form>
  );
};

export default compose(
  translate(),
  withFormik({
    displayName: "twoFactorForm",
    mapPropsToValues: () => ({
      twoFactorCode: ""
    }),
    validationSchema: validationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values.twoFactorCode, setSubmitting);
    }
  })
)(TwoFactorCodeForm);

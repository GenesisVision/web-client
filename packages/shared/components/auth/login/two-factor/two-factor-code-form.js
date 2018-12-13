import "./two-factor-code.scss";

import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import { LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE } from "pages/auth/login/login.routes";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import { object, string } from "yup";

const TwoFactorCodeForm = ({ t, handleSubmit, isSubmitting, error }) => {
  return (
    <form
      id="twoFactorForm"
      className="login-two-factor"
      onSubmit={handleSubmit}
      noValidate
    >
      <h3>{t("auth.login.two-factor.title")}</h3>
      <div className="login-two-factor__text">
        {t("auth.login.two-factor.text")}
      </div>
      <GVFormikField
        type="text"
        name="twoFactorCode"
        label={t("auth.login.two-factor.input-label")}
        autoComplete="off"
        autoFocus
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

      <FormError error={error} />
      <div className="login-two-factor__submit">
        <GVButton type="submit" id="signUpFormSubmit">
          {t("auth.login.two-factor.verify")}
        </GVButton>
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
    validationSchema: ({ t }) =>
      object().shape({
        twoFactorCode: string()
          .trim()
          .matches(
            /^\d{6}$/,
            t("auth.login.two-factor.validation.two-factor-6digits")
          )
          .required(t("auth.login.two-factor.validation.two-factor-required"))
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values.twoFactorCode, setSubmitting);
    }
  })
)(TwoFactorCodeForm);

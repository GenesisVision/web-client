import "./reset-password.css";

import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import React from "react";
import { Link } from "react-router-dom";
import { translate } from "react-i18next";
import { compose } from "redux";

import FormError from "../../../../../shared/components/form/form-error/form-error";
import { FORGOT_PASSWORD_ROUTE } from "pages/forgot-password/forgot-password.routes";
import validationSchema from "./reset-password.validators";

const ResetPassword = ({ isSubmitting, handleSubmit, error, t }) => {
  return (
    <form id="resetPasswordForm" onSubmit={handleSubmit} noValidate>
      <GVFormikField
        type="new-password"
        name="password"
        label={t("password-restore.new-password.password-field-text")}
        component={GVTextField}
      />
      <GVFormikField
        type="new-password"
        name="confirmPassword"
        label={t("password-restore.new-password.password-confirm-field-text")}
        component={GVTextField}
      />
      <FormError error={error} />
      <div className="reset-password__navigation">
        <Link to={FORGOT_PASSWORD_ROUTE} className="reset-password__btn-back">
          <GVButton variant="text">
            &larr; {t("password-restore.new-password.back-button-text")}
          </GVButton>
        </Link>
        <GVButton type="submit" id="resetPasswordSubmit">
          {t("password-restore.new-password.confirm-button-text")}
        </GVButton>
      </div>
    </form>
  );
};

const withTranslationAndFormik = compose(
  translate(),
  withFormik({
    displayName: "resetPassword",
    mapPropsToValues: () => ({
      password: "",
      confirmPassword: ""
    }),
    validationSchema: validationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(ResetPassword);

export default withTranslationAndFormik;

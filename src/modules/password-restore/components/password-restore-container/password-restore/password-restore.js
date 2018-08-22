import "./password-restore.scss";

import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import { FORGOT_PASSWORD_ROUTE } from "pages/forgot-password/forgot-password.routes";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";

import validationSchema from "./password-restore.validators";

const RestorePassword = ({ t, isSubmitting, handleSubmit, error }) => {
  return (
    <form id="passwordRestoreForm" onSubmit={handleSubmit} noValidate>
      <GVFormikField
        type="new-password"
        name="password"
        label={t("auth.password-restore.new-password.password-field-text")}
        component={GVTextField}
      />
      <GVFormikField
        type="new-password"
        name="confirmPassword"
        label={t(
          "auth.password-restore.new-password.password-confirm-field-text"
        )}
        component={GVTextField}
      />
      <FormError error={error} />
      <div className="password-restore__navigation">
        <Link to={FORGOT_PASSWORD_ROUTE} className="password-restore__btn-back">
          <GVButton variant="text">
            &larr; {t("auth.password-restore.new-password.back-button-text")}
          </GVButton>
        </Link>
        <GVButton type="submit" id="passwordRestoreSubmit">
          {t("auth.password-restore.new-password.confirm-button-text")}
        </GVButton>
      </div>
    </form>
  );
};

const withTranslationAndFormik = compose(
  translate(),
  withFormik({
    displayName: "passwordRestore",
    mapPropsToValues: () => ({
      password: "",
      confirmPassword: ""
    }),
    validationSchema: validationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(RestorePassword);

export default withTranslationAndFormik;

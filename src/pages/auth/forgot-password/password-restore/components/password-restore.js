import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import { object, ref, string } from "yup";

const RestorePassword = ({ t, isSubmitting, handleSubmit, error }) => {
  return (
    <form id="passwordRestoreForm" onSubmit={handleSubmit} noValidate>
      <GVFormikField
        type="password"
        name="password"
        label={t("auth.password-restore.new-password.password-field-text")}
        component={GVTextField}
      />
      <GVFormikField
        type="password"
        name="confirmPassword"
        label={t(
          "auth.password-restore.new-password.password-confirm-field-text"
        )}
        component={GVTextField}
      />
      <FormError error={error} />
      <div className="password-restore__navigation">
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
    validationSchema: ({ t }) =>
      object().shape({
        password: string()
          .min(6, t("auth.password-restore.validators.password-weak"))
          .required(t("auth.password-restore.validators.password-required")),
        confirmPassword: string()
          .oneOf(
            [ref("password")],
            t("auth.password-restore.validators.password-dont-match")
          )
          .required(
            t("auth.password-restore.validators.confirm-password-required")
          )
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(RestorePassword);

export default withTranslationAndFormik;

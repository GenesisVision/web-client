import "./reset-password.css";

import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import React from "react";
import { Link } from "react-router-dom";

import FormError from "../../../../../shared/components/form/form-error/form-error";
import { FORGOT_PASSWORD_ROUTE } from "pages/forgot-password/forgot-password.routes";
import validationSchema from "./reset-password.validators";

const ResetPassword = ({ isSubmitting, handleSubmit, error }) => {
  return (
    <form id="resetPasswordForm" onSubmit={handleSubmit} noValidate>
      <GVFormikField
        type="new-password"
        name="password"
        label="New Password"
        component={GVTextField}
      />
      <GVFormikField
        type="new-password"
        name="confirmPassword"
        label="Confirm New Password"
        component={GVTextField}
      />
      <FormError error={error} />
      <Link to={FORGOT_PASSWORD_ROUTE} className="email-pending__btn-back">
        <GVButton color>&larr; Back</GVButton>
      </Link>
      <GVButton type="submit" id="resetPasswordSubmit">
        Submit
      </GVButton>
    </form>
  );
};

export default withFormik({
  displayName: "resetPassword",
  mapPropsToValues: () => ({
    password: "",
    confirmPassword: ""
  }),
  validationSchema: validationSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values, setSubmitting);
  }
})(ResetPassword);

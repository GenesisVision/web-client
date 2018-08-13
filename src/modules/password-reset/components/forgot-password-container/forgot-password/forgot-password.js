import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import React from "react";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE } from "pages/login/login.routes";

import FormError from "../../../../../shared/components/form/form-error/form-error";
import validationSchema from "./forgot-password.validators";

const ForgotPasswordForm = ({ values, isSubmitting, handleSubmit, error }) => {
  return (
    <form id="forgotPasswordForm" onSubmit={handleSubmit} noValidate>
      <GVFormikField
        type="email"
        name="email"
        label="Email address"
        addon="fas fa-envelope"
        component={GVTextField}
      />
      <FormError error={error} />
      <Link to={LOGIN_ROUTE} className="forgot-password__btn-back">
        <GVButton color="secondary" variant="outlined">
          &larr; Back
        </GVButton>
      </Link>
      <GVButton
        id="forgotPassword"
        title="submit restore form"
        color="primary"
        variant="contained"
        disabled={isSubmitting}
        type="submit"
      >
        Restore
      </GVButton>
    </form>
  );
};

export default withFormik({
  displayName: "forgotPassword",
  mapPropsToValues: () => ({
    email: ""
  }),
  validationSchema: validationSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values, setSubmitting);
  }
})(ForgotPasswordForm);

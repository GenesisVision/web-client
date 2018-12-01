import React from "react";
import { connect } from "react-redux";

import ForgotPassword from "./forgot-password";

const ForgotPasswordContainer = ({
  isPending,
  errorMessage,
  forgotPassword,
  LOGIN_ROUTE
}) => {
  const handleSubmit = (formData, setSubmitting) => {
    forgotPassword(formData, setSubmitting);
  };

  return (
    <ForgotPassword
      error={errorMessage}
      onSubmit={handleSubmit}
      LOGIN_ROUTE={LOGIN_ROUTE}
    />
  );
};

const mapStateToProps = state => {
  const { isPending, errorMessage } = state.passwordRestoreData.forgot;
  return { isPending, errorMessage };
};

const mapDispatchToProps = (dispatch, props) => ({
  forgotPassword: (formData, setSubmitting) => {
    dispatch(props.forgotPasswordService.forgotPassword(formData)).catch(() => {
      setSubmitting(false);
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordContainer);

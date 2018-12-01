import React from "react";
import { connect } from "react-redux";

import ForgotPassword from "./forgot-password";

const ForgotPasswordContainer = ({
  isPending,
  errorMessage,
  forgotPassword
}) => {
  const handleSubmit = (formData, setSubmitting) => {
    forgotPassword(formData, setSubmitting);
  };

  return <ForgotPassword error={errorMessage} onSubmit={handleSubmit} />;
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

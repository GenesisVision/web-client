import React from "react";
import { connect } from "react-redux";

import passwordResetService from "../../service/password-reset-service";
import ResetPassword from "./reset-password/reset-password";

const ResetPasswordContainer = ({
  queryParams,
  isPending,
  errorMessage,
  resetPassword
}) => {
  const handleSubmit = (formData, setSubmitting) => {
    resetPassword(
      queryParams.userId,
      queryParams.code,
      formData,
      setSubmitting
    );
  };
  if (!queryParams.userId || !queryParams.code) return null;
  return <ResetPassword error={errorMessage} onSubmit={handleSubmit} />;
};

const mapStateToProps = state => {
  const { isPending, errorMessage } = state.passwordResetData.reset;
  return { isPending, errorMessage };
};

const mapDispatchToProps = dispatch => ({
  resetPassword: (userId, code, formData, setSubmitting) => {
    dispatch(passwordResetService.resetPassword(userId, code, formData)).catch(
      () => {
        setSubmitting(false);
      }
    );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordContainer);

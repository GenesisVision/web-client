import React from "react";
import { connect } from "react-redux";

import forgotPasswordService from "../../services/forgot-password.service";
import PasswordRestore from "./password-restore";

const PasswordRestoreContainer = ({
  queryParams,
  isPending,
  errorMessage,
  restorePassword
}) => {
  const handleSubmit = (formData, setSubmitting) => {
    restorePassword(
      queryParams.userId,
      queryParams.code,
      formData,
      setSubmitting
    );
  };
  // if (!queryParams.userId || !queryParams.code) return null;
  return <PasswordRestore error={errorMessage} onSubmit={handleSubmit} />;
};

const mapStateToProps = state => {
  const { isPending, errorMessage } = state.passwordRestoreData.restore;
  return { isPending, errorMessage };
};

const mapDispatchToProps = dispatch => ({
  restorePassword: (userId, code, formData, setSubmitting) => {
    dispatch(
      forgotPasswordService.restorePassword(userId, code, formData)
    ).catch(() => {
      setSubmitting(false);
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordRestoreContainer);

import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import forgotPasswordService from "../../services/forgot-password.service";
import PasswordRestore from "./password-restore";

const PasswordRestoreContainer = ({
  t,
  queryParams,
  isPending,
  errorMessage,
  services
}) => {
  const handleSubmit = (formData, setSubmitting) => {
    const params = {
      userId: queryParams.userId,
      code: queryParams.code,
      data: formData,
      setSubmitting
    };

    services.restorePassword(params);
  };
  // if (!queryParams.userId || !queryParams.code) return null;
  return <PasswordRestore error={errorMessage} onSubmit={handleSubmit} />;
};

const mapStateToProps = state => {
  const { isPending, errorMessage } = state.passwordRestoreData.restore;
  return { isPending, errorMessage };
};

const mapDispatchToProps = dispatch => ({
  services: bindActionCreators(forgotPasswordService, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordRestoreContainer);

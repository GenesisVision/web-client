import React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

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
      setSubmitting,
      successText: t("auth.password-restore.success-alert-message")
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

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PasswordRestoreContainer);

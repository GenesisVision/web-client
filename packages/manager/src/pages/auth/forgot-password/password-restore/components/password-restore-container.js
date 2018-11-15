import { NOT_FOUND_PAGE_ROUTE } from "shared/components/not-found/not-found.routes";
import React from "react";
import { connect } from "react-redux";
import { replace } from "react-router-redux";
import { bindActionCreators } from "redux";

import forgotPasswordService from "../../services/forgot-password.service";
import PasswordRestore from "./password-restore";

const PasswordRestoreContainer = ({
  t,
  queryParams,
  isPending,
  errorMessage,
  services,
  showNotFoundPage
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
  if (!queryParams.userId || !queryParams.code) {
    showNotFoundPage();
    return null;
  }
  return <PasswordRestore error={errorMessage} onSubmit={handleSubmit} />;
};

const mapStateToProps = state => {
  const { isPending, errorMessage } = state.passwordRestoreData.restore;
  return { isPending, errorMessage };
};

const mapDispatchToProps = dispatch => ({
  services: bindActionCreators(forgotPasswordService, dispatch),
  showNotFoundPage: () => dispatch(replace(NOT_FOUND_PAGE_ROUTE))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  PasswordRestoreContainer
);

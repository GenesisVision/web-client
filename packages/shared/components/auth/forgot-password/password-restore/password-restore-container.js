import React, { Component } from "react";
import { connect } from "react-redux";
import { replace } from "react-router-redux";
import { bindActionCreators } from "redux";
import { NOT_FOUND_PAGE_ROUTE } from "shared/components/not-found/not-found.routes";

import PasswordRestore from "./password-restore";

class PasswordRestoreContainer extends Component {
  handleSubmit = (formData, setSubmitting) => {
    const { service, queryParams } = this.props;
    const params = {
      userId: queryParams.userId,
      code: queryParams.code,
      data: formData,
      setSubmitting
    };

    service.restorePassword(params);
  };
  render() {
    const { queryParams, errorMessage, service } = this.props;

    if (!queryParams.userId || !queryParams.code) {
      service.showNotFoundPage();
    }
    return (
      <PasswordRestore error={errorMessage} onSubmit={this.handleSubmit} />
    );
  }
}

const mapStateToProps = state => {
  const { isPending, errorMessage } = state.passwordRestoreData.restore;
  return { isPending, errorMessage };
};

const mapDispatchToProps = (dispatch, props) => ({
  service: bindActionCreators(
    {
      restorePassword: props.forgotPasswordService.restorePassword,
      showNotFoundPage: () => replace(NOT_FOUND_PAGE_ROUTE)
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordRestoreContainer);

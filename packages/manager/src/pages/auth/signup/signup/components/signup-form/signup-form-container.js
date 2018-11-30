import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getRef } from "shared/utils/ref";

import * as signUpService from "../../../services/signup.service";
import SignUpForm from "./signup-form";

const SignUpFormContainer = ({
  isAuthenticated,
  isPending,
  errorMessage,
  service
}) => {
  const handleSubmit = (signUpFormData, setSubmitting) => {
    service.signUp(signUpFormData, setSubmitting);
  };

  const refCode = getRef();

  return (
    <SignUpForm
      refCode={refCode}
      onSubmit={handleSubmit}
      error={errorMessage}
    />
  );
};

const mapStateToProps = ({ signUpData, authData }) => {
  const { isPending, errorMessage } = signUpData;
  const { isAuthenticated } = authData;
  return { isAuthenticated, isPending, errorMessage };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(signUpService, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpFormContainer);
